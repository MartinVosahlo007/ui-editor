import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";
import { CANVAS_HEIGHT, CANVAS_TOP_BAR_HEIGHT, CANVAS_WIDTH } from "../../domain/canvas/canvas.constants";
import { useCanvasPointerInteractions } from "../../features/editor/useCanvasPointerInteractions";
import { CanvasElementFrame } from "./CanvasElementFrame";
import { GridBackground } from "./GridBackground";
import { PreviewRenderer } from "../preview/PreviewRenderer";

interface CanvasProps {
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  zoom: number;
  showGrid: boolean;
  preview: boolean;
  onClearSelection: () => void;
  onSelectElement: (id: CanvasElementId) => void;
  onInteractionStart: () => void;
  onMoveElement: (id: CanvasElementId, x: number, y: number) => void;
  onResizeElement: (id: CanvasElementId, width: number, height: number) => void;
}

export function Canvas({
  elements,
  selectedId,
  zoom,
  showGrid,
  preview,
  onClearSelection,
  onSelectElement,
  onInteractionStart,
  onMoveElement,
  onResizeElement,
}: CanvasProps) {
  const pointerInteractions = useCanvasPointerInteractions({
    zoom,
    preview,
    onSelect: onSelectElement,
    onInteractionStart,
    onMove: onMoveElement,
    onResize: onResizeElement,
  });

  return (
    <div className="h-full overflow-auto p-16" onPointerDown={onClearSelection}>
      <GridBackground showGrid={showGrid} zoom={zoom}>
        <div className="absolute left-0 right-0 top-0 flex h-10 items-center justify-between rounded-t-[28px] border-b border-slate-200 bg-white/90 px-5 text-xs text-slate-500 backdrop-blur">
          <span>
            Canvas • {CANVAS_WIDTH}×{CANVAS_HEIGHT} • 12/24 sloupcová mřížka • snap 4px
          </span>
          <span>{elements.length} komponent</span>
        </div>

        <div className="absolute inset-x-0 bottom-0" style={{ top: CANVAS_TOP_BAR_HEIGHT }}>
          {elements.map((element) => (
            <CanvasElementFrame
              key={element.id}
              element={element}
              selected={selectedId === element.id && !preview}
              preview={preview}
              onPointerDown={pointerInteractions.createDragStartHandler(element)}
              onResizePointerDown={pointerInteractions.createResizeStartHandler(element)}
            >
              <PreviewRenderer element={element} />
            </CanvasElementFrame>
          ))}
        </div>
      </GridBackground>
    </div>
  );
}
