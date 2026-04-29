import { Icon } from "../../shared/Icon";

export function CollapsiblePreview() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white text-[11px] text-slate-600">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-800">
        Rozšířené parametry
        <Icon name="chevronDown" size={14} />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 rounded bg-slate-200" />
        <div className="h-2 w-4/5 rounded bg-slate-100" />
        <div className="h-2 w-2/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}
