import { useCallback, useMemo } from "react";
import type { Dispatch } from "react";
import { clampZoom } from "../../domain/canvas/canvas.helpers";
import { createElementFromPaletteItem } from "../../domain/canvas/canvas.commands";
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
import { saveEditorDocument } from "../persistence/editorStorage";

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
  captureHistory: () => void;
  undo: () => void;
  redo: () => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleGrid: () => void;
  togglePreview: () => void;
  exportJson: () => void;
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
  actions: EditorActions;
}

export function useEditorController(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
): EditorController {
  const selectedElement = selectSelectedElement(state);
  const canUndo = selectCanUndo(state);
  const canRedo = selectCanRedo(state);

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

  const exportJson = useCallback(
    () => exportEditorJson(state.elements, state.selectedId),
    [state.elements, state.selectedId]
  );

  const save = useCallback(() => {
    const savedAt = new Date().toISOString();

    saveEditorDocument({
      version: 1,
      elements: state.elements,
      selectedId: state.selectedId,
      savedAt,
    });

    dispatch({ type: "MARK_SAVED", savedAt });
  }, [dispatch, state.elements, state.selectedId]);

  const reset = useCallback(
    () => dispatch({ type: "RESET", elements: createElementsFromTemplate("erpList") }),
    [dispatch]
  );

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
      captureHistory,
      undo,
      redo,
      setZoom,
      zoomIn,
      zoomOut,
      toggleGrid,
      togglePreview,
      exportJson,
      save,
      reset,
    }),
    [
      addPaletteItem,
      applyTemplate,
      captureHistory,
      clearSelection,
      deleteElement,
      deleteSelectedElement,
      exportJson,
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
    actions,
  };
}
