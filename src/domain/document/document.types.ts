import type { CanvasElement, CanvasElementId } from "../canvas/canvas.types";

export interface EditorDocument {
  version: 1;
  name: string;
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  savedAt: string | null;
}
