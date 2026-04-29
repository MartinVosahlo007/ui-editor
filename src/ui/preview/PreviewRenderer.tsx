import type { CanvasElement } from "../../domain/canvas/canvas.types";
import { resolvePreviewComponent } from "./previewRegistry";

interface PreviewRendererProps {
  element: CanvasElement;
}

export function PreviewRenderer({ element }: PreviewRendererProps) {
  const PreviewComponent = resolvePreviewComponent(element);
  return <PreviewComponent element={element} />;
}
