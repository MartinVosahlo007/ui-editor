import { useCallback } from "react";
import type { Dispatch } from "react";
import { clampZoom } from "../../domain/canvas/canvas.helpers";
import type { AlignCommand } from "../../domain/canvas/canvas.commands";
import {
  selectCanRedo,
  selectCanUndo,
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
import type { StatusMessageValue } from "../../shared/status.types";
import { exportEditorJson } from "../export/exportJson";
import { importEditorJson } from "../import/importJson";
import { saveEditorDocument } from "../persistence/editorStorage";
import { useElementCommands } from "./useElementCommands";
import { useResetDocument } from "./useResetDocument";
import { useStatusMessage } from "../status/useStatusMessage";

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
  selectedElement: ReturnType<typeof useElementCommands>["selectedElement"];
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
  const canUndo = selectCanUndo(state);
  const canRedo = selectCanRedo(state);
  const { statusMessage, setTimedStatus } = useStatusMessage();
  const elementCommands = useElementCommands({ state, dispatch, setTimedStatus });

  const applyTemplate = useCallback(
    (templateKey: TemplateKey) => {
      dispatch({ type: "APPLY_TEMPLATE", elements: createElementsFromTemplate(templateKey) });
    },
    [dispatch]
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
  const togglePreview = useCallback(
    () => dispatch({ type: state.preview ? "EXIT_PREVIEW" : "ENTER_PREVIEW" }),
    [dispatch, state.preview]
  );

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

  const reset = useResetDocument({ dispatch, setTimedStatus });

  const actions: EditorActions = {
      addPaletteItem: elementCommands.addPaletteItem,
      applyTemplate,
      selectElement: elementCommands.selectElement,
      clearSelection: elementCommands.clearSelection,
      updateElement: elementCommands.updateElement,
      updateElementProps: elementCommands.updateElementProps,
      deleteElement: elementCommands.deleteElement,
      deleteSelectedElement: elementCommands.deleteSelectedElement,
      duplicateSelectedElement: elementCommands.duplicateSelectedElement,
      nudgeSelectedElement: elementCommands.nudgeSelectedElement,
      alignSelectedElement: elementCommands.alignSelectedElement,
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
  };

  return {
    state,
    selectedElement: elementCommands.selectedElement,
    canUndo,
    canRedo,
    paletteGroups: PALETTE_GROUPS,
    templates: TEMPLATE_DEFINITIONS,
    statusMessage,
    actions,
  };
}
