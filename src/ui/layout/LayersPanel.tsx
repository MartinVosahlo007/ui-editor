import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";
import { classNames } from "../../shared/classNames";
import { Icon } from "../shared/Icon";

interface LayersPanelProps {
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
  onSelect: (id: CanvasElementId) => void;
}

export function LayersPanel({ elements, selectedId, onSelect }: LayersPanelProps) {
  return (
    <section className="min-h-0 border-b border-slate-200 p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold">
        <Icon name="layers" size={16} />
        Layers
      </div>

      <div className="max-h-[204px] overflow-auto rounded-2xl border border-slate-200">
        {elements.map((element, index) => (
          <button
            type="button"
            key={element.id}
            onClick={() => onSelect(element.id)}
            className={classNames(
              "flex w-full items-center justify-between border-b border-slate-100 px-3 py-2 text-left text-xs last:border-b-0",
              selectedId === element.id ? "bg-slate-900 text-white" : "hover:bg-slate-50"
            )}
          >
            <span className="truncate">
              <b>{index + 1}.</b> {element.label}
            </span>
            <span className="text-[10px] opacity-60">
              {element.w}×{element.h}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
