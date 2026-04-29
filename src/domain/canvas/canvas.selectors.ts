import type { CanvasElement, EditorState } from "./canvas.types";

export function selectSelectedElement(state: EditorState): CanvasElement | null {
  if (!state.selectedId) return null;
  return state.elements.find((element) => element.id === state.selectedId) ?? null;
}

export function selectCanUndo(state: EditorState): boolean {
  return state.history.past.length > 0;
}

export function selectCanRedo(state: EditorState): boolean {
  return state.history.future.length > 0;
}
