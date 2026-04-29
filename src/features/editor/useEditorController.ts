import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch } from "react";
import { clampZoom } from "../../domain/canvas/canvas.helpers";
import { createElementFromPaletteItem } from "../../domain/canvas/canvas.commands";
import { CANVAS_CONTENT_BOUNDS, clampElementGeometry } from "../../domain/canvas/geometry.helpers";
import {
  selectCanRedo,
  selectCanUndo,
  selectSelectedElement,
} from "../../domain/canvas/canvas.selectors";
import type {
  CanvasElementId,
  CanvasElementPatch,
  CanvasElementPropsPatch,
  EditorAction,
  EditorState,
} from "../../domain/canvas/canvas.types";
import { PALETTE_GROUPS } from "../../domain/palette/palette.data";
import type { PaletteItem } from "../../domain/palette/palette.types";
import { TEMPLATE_DEFINITIONS } from "../../domain/templates/template.data";
import { createElementsFromTemplate } from "../../domain/templates/template.factory";
import type { TemplateKey } from "../../domain/templates/template.types";
import { exportEditorJson } from "../export/exportJson";
import { importEditorJson } from "../import/importJson";
import { saveEditorDocument } from "../persistence/editorStorage";
import type { StatusMessageValue } from "../../ui/shared/StatusMessage";

export type AlignCommand = "left" | "centerX" | "right" | "top" | "middleY" | "bottom";

export interface EditorActions {
  addPaletteItem: (item: PaletteItem) => void;
  applyTemplate: (templateKey: TemplateKey) => void;
  selectElement: (id: CanvasElementId | null) => void;
  clearSelection: () => void;
  updateElement: (
    id: CanvasElementId,
    patch: CanvasElementPatch,
    options?: { trackHistory?: boolean }
  ) => void;
  updateElementProps: (
    id: CanvasElementId,
    patch: CanvasElementPropsPatch,
    options?: { trackHistory?: boolean }
  ) => void;
  deleteElement: (id: CanvasElementId) => void;
  deleteSelectedElement: () => void;
  duplicateSelectedElement: () => void;
  nudgeSelectedElement: (deltaX: number, deltaY: number) => void;
  alignSelectedElement: (command: AlignCommand) => void;
  captureHistory: () => void;
  undo: () => void;
  redo: () => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleGrid: () => void;
  togglePreview: () => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  save: () => void;
  reset: () => void;
}

export interface EditorController {
  state: EditorState;
  selectedElement: ReturnType<typeof selectSelectedElement>;
  canUndo: boolean;
  canRedo: boolean;
  paletteGroups: typeof PALETTE_GROUPS;
  templates: typeof TEMPLATE_DEFINITIONS;
  statusMessage: StatusMessageValue | null;
  actions: EditorActions;
}

export function useEditorController(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
): EditorController {
  const selectedElement = selectSelectedElement(state);
  const canUndo = selectCanUndo(state);
  const canRedo = selectCanRedo(state);
  const [statusMessage, setStatusMessage] = useState<StatusMessageValue | null>(null);

  const setTimedStatus = useCallback((message: StatusMessageValue) => {
    setStatusMessage(message);
  }, []);

  useEffect(() => {
    if (!statusMessage) return;

    const timeout = window.setTimeout(
      () => setStatusMessage(null),
      statusMessage.tone === "error" ? 5000 : 3000
    );

    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  const addPaletteItem = useCallback(
    (item: PaletteItem) => {
      dispatch({
        type: "ADD_ELEMENT",
        element: createElementFromPaletteItem(item, state.elements.length),
      });
    },
    [dispatch, state.elements.length]
  );

  const applyTemplate = useCallback(
    (templateKey: TemplateKey) => {
      dispatch({ type: "APPLY_TEMPLATE", elements: createElementsFromTemplate(templateKey) });
    },
    [dispatch]
  );

  const selectElement = useCallback(
    (id: CanvasElementId | null) => dispatch({ type: "SELECT_ELEMENT", id }),
    [dispatch]
  );

  const clearSelection = useCallback(() => selectElement(null), [selectElement]);

  const updateElement = useCallback(
    (
      id: CanvasElementId,
      patch: CanvasElementPatch,
      options?: { trackHistory?: boolean }
    ) => dispatch({ type: "UPDATE_ELEMENT", id, patch, trackHistory: options?.trackHistory }),
    [dispatch]
  );

  const updateElementProps = useCallback(
    (
      id: CanvasElementId,
      patch: CanvasElementPropsPatch,
      options?: { trackHistory?: boolean }
    ) => dispatch({ type: "UPDATE_ELEMENT_PROPS", id, patch, trackHistory: options?.trackHistory }),
    [dispatch]
  );

  const deleteElement = useCallback(
    (id: CanvasElementId) => dispatch({ type: "DELETE_ELEMENT", id }),
    [dispatch]
  );

  const deleteSelectedElement = useCallback(() => {
    if (!state.selectedId) return;
    dispatch({ type: "DELETE_ELEMENT", id: state.selectedId });
  }, [dispatch, state.selectedId]);

  const duplicateSelectedElement = useCallback(() => {
    if (!state.selectedId) return;
    dispatch({ type: "DUPLICATE_ELEMENT", id: state.selectedId });
    setTimedStatus({ tone: "success", text: "Komponenta duplikována" });
  }, [dispatch, setTimedStatus, state.selectedId]);

  const nudgeSelectedElement = useCallback(
    (deltaX: number, deltaY: number) => {
      if (!selectedElement) return;

      const next = clampElementGeometry({
        ...selectedElement,
        x: selectedElement.x + deltaX,
        y: selectedElement.y + deltaY,
      });

      dispatch({
        type: "UPDATE_ELEMENT",
        id: selectedElement.id,
        patch: { x: next.x, y: next.y },
      });
    },
    [dispatch, selectedElement]
  );

  const alignSelectedElement = useCallback(
    (command: AlignCommand) => {
      if (!selectedElement) return;

      const patch: CanvasElementPatch = {};

      if (command === "left") patch.x = 0;
      if (command === "centerX") patch.x = Math.round((CANVAS_CONTENT_BOUNDS.w - selectedElement.w) / 2);
      if (command === "right") patch.x = CANVAS_CONTENT_BOUNDS.w - selectedElement.w;
      if (command === "top") patch.y = 0;
      if (command === "middleY") patch.y = Math.round((CANVAS_CONTENT_BOUNDS.h - selectedElement.h) / 2);
      if (command === "bottom") patch.y = CANVAS_CONTENT_BOUNDS.h - selectedElement.h;

      dispatch({ type: "UPDATE_ELEMENT", id: selectedElement.id, patch });
      setTimedStatus({ tone: "success", text: "Zarovnáno" });
    },
    [dispatch, selectedElement, setTimedStatus]
  );

  const captureHistory = useCallback(() => dispatch({ type: "CAPTURE_HISTORY" }), [dispatch]);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), [dispatch]);
  const redo = useCallback(() => dispatch({ type: "REDO" }), [dispatch]);

  const setZoom = useCallback(
    (zoom: number) => dispatch({ type: "SET_ZOOM", zoom: clampZoom(zoom) }),
    [dispatch]
  );

  const zoomIn = useCallback(() => setZoom(state.zoom + 0.1), [setZoom, state.zoom]);
  const zoomOut = useCallback(() => setZoom(state.zoom - 0.1), [setZoom, state.zoom]);

  const toggleGrid = useCallback(() => dispatch({ type: "TOGGLE_GRID" }), [dispatch]);
  const togglePreview = useCallback(() => dispatch({ type: "TOGGLE_PREVIEW" }), [dispatch]);

  const exportJson = useCallback(() => {
    exportEditorJson(state.elements, state.selectedId);
    setTimedStatus({ tone: "success", text: "JSON export vytvořen" });
  }, [setTimedStatus, state.elements, state.selectedId]);

  const importJson = useCallback(
    async (file: File) => {
      try {
        const document = await importEditorJson(file);
        dispatch({
          type: "LOAD_DOCUMENT",
          elements: document.elements,
          selectedId: document.selectedId,
          savedAt: document.savedAt,
        });
        saveEditorDocument(document);
        setTimedStatus({ tone: "success", text: "JSON import hotový" });
      } catch (error) {
        console.warn("Import JSON failed", error);
        setTimedStatus({ tone: "error", text: "Import selhal: neplatný JSON dokument" });
      }
    },
    [dispatch, setTimedStatus]
  );

  const save = useCallback(() => {
    const savedAt = new Date().toISOString();

    saveEditorDocument({
      version: 1,
      name: "ERP Wireframe",
      elements: state.elements,
      selectedId: state.selectedId,
      savedAt,
    });

    dispatch({ type: "MARK_SAVED", savedAt });
    setTimedStatus({ tone: "success", text: "Uloženo" });
  }, [dispatch, setTimedStatus, state.elements, state.selectedId]);

  const reset = useCallback(() => {
    const elements = createElementsFromTemplate("erpList");
    const savedAt = new Date().toISOString();

    dispatch({ type: "RESET", elements });
    saveEditorDocument({
      version: 1,
      name: "ERP Wireframe",
      elements,
      selectedId: null,
      savedAt,
    });
    dispatch({ type: "MARK_SAVED", savedAt });
    setTimedStatus({ tone: "success", text: "Reset hotový" });
  }, [dispatch, setTimedStatus]);

  const actions = useMemo<EditorActions>(
    () => ({
      addPaletteItem,
      applyTemplate,
      selectElement,
      clearSelection,
      updateElement,
      updateElementProps,
      deleteElement,
      deleteSelectedElement,
      duplicateSelectedElement,
      nudgeSelectedElement,
      alignSelectedElement,
      captureHistory,
      undo,
      redo,
      setZoom,
      zoomIn,
      zoomOut,
      toggleGrid,
      togglePreview,
      exportJson,
      importJson,
      save,
      reset,
    }),
    [
      alignSelectedElement,
      addPaletteItem,
      applyTemplate,
      captureHistory,
      clearSelection,
      deleteElement,
      deleteSelectedElement,
      duplicateSelectedElement,
      exportJson,
      importJson,
      nudgeSelectedElement,
      redo,
      reset,
      save,
      selectElement,
      setZoom,
      toggleGrid,
      togglePreview,
      undo,
      updateElement,
      updateElementProps,
      zoomIn,
      zoomOut,
    ]
  );

  return {
    state,
    selectedElement,
    canUndo,
    canRedo,
    paletteGroups: PALETTE_GROUPS,
    templates: TEMPLATE_DEFINITIONS,
    statusMessage,
    actions,
  };
}
