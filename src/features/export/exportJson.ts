import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";
import { downloadTextFile } from "./downloadFile";

export interface EditorExportDocument {
  version: 1;
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  exportedAt: string;
}

export function createExportDocument(
  elements: CanvasElement[],
  selectedId: CanvasElementId | null
): EditorExportDocument {
  return {
    version: 1,
    elements,
    selectedId,
    exportedAt: new Date().toISOString(),
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
