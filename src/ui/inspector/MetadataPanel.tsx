import { Icon } from "../shared/Icon";

const metadataRows = [
  ["database", "Entita: SalesOrder / Journal / Inventory"],
  ["list", "Práva: read, edit, approve, export"],
  ["zap", "Akce: validate, recalc, sync, print"],
] as const;

export function MetadataPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 p-3">
      <div className="mb-2 font-semibold text-slate-700">ERP metadata</div>

      <div className="grid gap-2">
        {metadataRows.map(([icon, label]) => (
          <div key={label} className="rounded-xl bg-slate-50 p-2">
            <Icon name={icon} size={13} className="inline" /> {label}
          </div>
        ))}
      </div>
    </div>
  );
}
