import type { CanvasElement } from "../../domain/canvas/canvas.types";
import { sanitizeNumberInput } from "../../domain/canvas/geometry.helpers";

type GeometryPatch = Pick<Partial<CanvasElement>, "x" | "y" | "w" | "h">;

interface GeometryFieldsProps {
  element: CanvasElement;
  onChange: (patch: GeometryPatch) => void;
}

const geometryKeys = ["x", "y", "w", "h"] as const;

type GeometryKey = (typeof geometryKeys)[number];

function createGeometryPatch(key: GeometryKey, value: number): GeometryPatch {
  return { [key]: value } as GeometryPatch;
}

export function GeometryFields({ element, onChange }: GeometryFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 p-3">
      {geometryKeys.map((key) => (
        <label key={key}>
          <span className="mb-1 block font-semibold uppercase text-slate-500">{key}</span>

          <input
            type="number"
            value={element[key]}
            onChange={(event) =>
              onChange(createGeometryPatch(key, sanitizeNumberInput(event.target.value, element[key])))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-900"
          />
        </label>
      ))}
    </div>
  );
}
