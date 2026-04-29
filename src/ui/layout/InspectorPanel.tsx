import type { CanvasElement, CanvasElementPatch, CanvasElementPropsPatch } from "../../domain/canvas/canvas.types";
import { EmptyState } from "../shared/EmptyState";
import { Icon } from "../shared/Icon";
import { ElementInspector } from "../inspector/ElementInspector";

interface InspectorPanelProps {
  selectedElement: CanvasElement | null;
  onElementChange: (element: CanvasElement, patch: CanvasElementPatch) => void;
  onPropsChange: (element: CanvasElement, patch: CanvasElementPropsPatch) => void;
  onDelete: (element: CanvasElement) => void;
}

export function InspectorPanel({ selectedElement, onElementChange, onPropsChange, onDelete }: InspectorPanelProps) {
  return (
    <section className="min-h-0 overflow-auto p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold">
        <Icon name="settings" size={16} />
        Properties panel
      </div>

      {!selectedElement ? (
        <EmptyState>Vyberte komponentu na canvasu nebo v Layers panelu.</EmptyState>
      ) : (
        <ElementInspector
          element={selectedElement}
          onElementChange={(patch) => onElementChange(selectedElement, patch)}
          onPropsChange={(patch) => onPropsChange(selectedElement, patch)}
          onDelete={() => onDelete(selectedElement)}
        />
      )}
    </section>
  );
}
