import { migrateEditorDocument } from "../../domain/document/document.migrations";
import { parseEditorDocument } from "../../domain/document/document.schema";
import type { EditorDocument } from "../../domain/document/document.types";

export async function importEditorJson(file: File): Promise<EditorDocument> {
  const raw = await file.text();
  const parsed = migrateEditorDocument(JSON.parse(raw));
  const result = parseEditorDocument(parsed);

  if (!result.success) {
    throw new Error("Soubor není platný UI Editor dokument.");
  }

  return result.data;
}
