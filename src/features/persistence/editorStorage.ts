import { migrateEditorDocument } from "../../domain/document/document.migrations";
import { parseEditorDocument } from "../../domain/document/document.schema";
import type { EditorDocument } from "../../domain/document/document.types";

export const EDITOR_STORAGE_KEY = "erp-wireframe-editor.document.v1";

export function loadEditorDocument(): EditorDocument | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(EDITOR_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = migrateEditorDocument(JSON.parse(raw));
    const result = parseEditorDocument(parsed);

    if (!result.success) {
      console.warn("Ignoring corrupted editor document in localStorage", result.error.flatten());
      return null;
    }

    return result.data;
  } catch (error) {
    console.warn("Ignoring corrupted editor document in localStorage", error);
    return null;
  }
}

export function saveEditorDocument(document: EditorDocument): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(document, null, 2));
}
