import type { Density } from "../../domain/canvas/canvas.types";
import { classNames } from "../../shared/classNames";

interface DensityControlProps {
  value: Density;
  onChange: (density: Density) => void;
}

const densities: Density[] = ["compact", "default", "comfortable"];

export function DensityControl({ value, onChange }: DensityControlProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-3">
      <label className="mb-2 block font-semibold text-slate-700">Hustota zobrazení</label>

      <div className="grid grid-cols-3 gap-2">
        {densities.map((density) => (
          <button
            type="button"
            key={density}
            onClick={() => onChange(density)}
            className={classNames(
              "rounded-xl border px-2 py-2",
              value === density ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"
            )}
          >
            {density}
          </button>
        ))}
      </div>
    </div>
  );
}
