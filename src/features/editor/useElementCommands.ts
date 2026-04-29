import { useCallback } from "react";
import type { Dispatch } from "react";
import {
  alignElement,
  createElementFromPaletteItem,
  nudgeElement,
  type AlignCommand,
} from "../../domain/canvas/canvas.commands";
import {
  selectSelectedElement,
} from "../../domain/canvas/canvas.selectors";
import type {
  CanvasElementId,
  CanvasElementPatch,
  CanvasElementPropsPatch,
  EditorAction,
  EditorState,
} from "../../domain/canvas/canvas.types";
import type { PaletteItem } from "../../domain/palette/palette.types";
import type { StatusMessageValue } from "../../shared/status.types";

interface UseElementCommandsOptions {
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  setTimedStatus: (message: StatusMessageValue) => void;
}

export function useElementCommands({ state, dispatch, setTimedStatus }: UseElementCommandsOptions) {
  const selectedElement = selectSelectedElement(state);

  const addPaletteItem = useCallback(
    (item: PaletteItem) => {
      dispatch({
        type: "ADD_ELEMENT",
        element: createElementFromPaletteItem(item, state.elements.length),
      });
    },
    [dispatch, state.elements.length]
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

      dispatch({
        type: "UPDATE_ELEMENT",
        id: selectedElement.id,
        patch: nudgeElement(selectedElement, deltaX, deltaY),
      });
    },
    [dispatch, selectedElement]
  );

  const alignSelectedElement = useCallback(
    (command: AlignCommand) => {
      const patch = alignElement(state.elements, state.selectedId, command);
      if (!state.selectedId || !patch) return;

      dispatch({ type: "UPDATE_ELEMENT", id: state.selectedId, patch });
      setTimedStatus({ tone: "success", text: "Zarovnáno" });
    },
    [dispatch, setTimedStatus, state.elements, state.selectedId]
  );

  return {
    selectedElement,
    addPaletteItem,
    selectElement,
    clearSelection,
    updateElement,
    updateElementProps,
    deleteElement,
    deleteSelectedElement,
    duplicateSelectedElement,
    nudgeSelectedElement,
    alignSelectedElement,
  };
}
