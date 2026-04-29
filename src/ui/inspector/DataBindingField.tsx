import type { CanvasElementProps } from "../../domain/canvas/canvas.types";

interface DataBindingFieldProps {
  props: CanvasElementProps;
  onChange: (patch: Partial<CanvasElementProps>) => void;
}

type FeatureFlagKey = "frozenColumns" | "virtualScroll" | "inlineEdit" | "batchEdit";

const featureFlags: Array<{ key: FeatureFlagKey; label: string }> = [
  { key: "frozenColumns", label: "Frozen sloupce" },
  { key: "virtualScroll", label: "Virtual scroll" },
  { key: "inlineEdit", label: "Inline edit" },
  { key: "batchEdit", label: "Batch edit" },
];

function getFeatureFlagChecked(props: CanvasElementProps, key: FeatureFlagKey): boolean {
  return key === "frozenColumns" ? props.frozenColumns > 0 : props[key];
}

function createFeatureFlagPatch(key: FeatureFlagKey, checked: boolean): Partial<CanvasElementProps> {
  if (key === "frozenColumns") {
    return { frozenColumns: checked ? 2 : 0 };
  }

  return { [key]: checked } as Partial<CanvasElementProps>;
}

export function DataBindingField({ props, onChange }: DataBindingFieldProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-3">
      <label className="mb-2 block font-semibold text-slate-700">Data binding</label>

      <input
        value={props.dataBinding}
        onChange={(event) => onChange({ dataBinding: event.target.value })}
        placeholder="např. ERP.SalesOrders"
        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-900"
      />

      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
        {featureFlags.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
            <input
              type="checkbox"
              checked={getFeatureFlagChecked(props, key)}
              onChange={(event) => onChange(createFeatureFlagPatch(key, event.target.checked))}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
