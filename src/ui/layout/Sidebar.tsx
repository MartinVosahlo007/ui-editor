import type { CanvasElement, CanvasElementId, CanvasElementPatch, CanvasElementPropsPatch } from "../../domain/canvas/canvas.types";
import { InspectorPanel } from "./InspectorPanel";
import { LayersPanel } from "./LayersPanel";

interface SidebarProps {
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  selectedElement: CanvasElement | null;
  onSelectElement: (id: CanvasElementId) => void;
  onElementChange: (element: CanvasElement, patch: CanvasElementPatch) => void;
  onPropsChange: (element: CanvasElement, patch: CanvasElementPropsPatch) => void;
  onDelete: (element: CanvasElement) => void;
}

export function Sidebar({
  elements,
  selectedId,
  selectedElement,
  onSelectElement,
  onElementChange,
  onPropsChange,
  onDelete,
}: SidebarProps) {
  return (
    <aside className="grid min-h-0 grid-rows-[260px_1fr] border-l border-slate-200 bg-white">
      <LayersPanel elements={elements} selectedId={selectedId} onSelect={onSelectElement} />
      <InspectorPanel
        selectedElement={selectedElement}
        onElementChange={onElementChange}
        onPropsChange={onPropsChange}
        onDelete={onDelete}
      />
    </aside>
  );
}
