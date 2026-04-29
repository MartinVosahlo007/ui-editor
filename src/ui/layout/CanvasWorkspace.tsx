import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import { Canvas } from "../canvas/Canvas";

interface CanvasWorkspaceProps {
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
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function CanvasWorkspace({
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
  onZoomIn,
  onZoomOut,
}: CanvasWorkspaceProps) {
  return (
    <section className="relative min-w-0 overflow-hidden bg-slate-200">
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur">
        <Button active>
          <Icon name="mouse" size={14} />
          Select
        </Button>

        <Button title="Připravené místo pro align commands">
          <Icon name="align" size={14} />
          Align
        </Button>

        <Button onClick={onZoomOut}>-</Button>
        <span className="w-12 text-center text-xs font-semibold text-slate-600">{Math.round(zoom * 100)}%</span>
        <Button onClick={onZoomIn}>+</Button>
      </div>

      <Canvas
        elements={elements}
        selectedId={selectedId}
        zoom={zoom}
        showGrid={showGrid}
        preview={preview}
        onClearSelection={onClearSelection}
        onSelectElement={onSelectElement}
        onInteractionStart={onInteractionStart}
        onMoveElement={onMoveElement}
        onResizeElement={onResizeElement}
      />
    </section>
  );
}
