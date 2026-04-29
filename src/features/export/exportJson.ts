import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";
import type { EditorDocument } from "../../domain/document/document.types";
import { downloadTextFile } from "./downloadFile";

export function createExportDocument(
  elements: CanvasElement[],
  selectedId: CanvasElementId | null
): EditorDocument {
  return {
    version: 1,
    name: "ERP Wireframe",
    elements,
    selectedId,
    savedAt: new Date().toISOString(),
  };
}

export function exportEditorJson(elements: CanvasElement[], selectedId: CanvasElementId | null): void {
  const document = createExportDocument(elements, selectedId);

  downloadTextFile(
    "erp-wireframe.json",
    JSON.stringify(document, null, 2),
    "application/json"
  );
}
