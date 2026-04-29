import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";

export const EDITOR_STORAGE_KEY = "erp-wireframe-editor.document.v1";

export interface PersistedEditorDocument {
  version: 1;
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  savedAt: string;
}

export function loadEditorDocument(): PersistedEditorDocument | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(EDITOR_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PersistedEditorDocument;

    if (parsed.version !== 1 || !Array.isArray(parsed.elements)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveEditorDocument(document: PersistedEditorDocument): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(document, null, 2));
}
