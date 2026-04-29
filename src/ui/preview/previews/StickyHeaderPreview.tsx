import { Icon } from "../../shared/Icon";

export function StickyHeaderPreview() {
  return (
    <div className="flex h-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-[11px] text-slate-600 shadow-sm">
      <div className="flex items-center gap-2 font-semibold text-slate-800">
        <Icon name="layers" size={14} />
        Faktury
      </div>
      <div className="flex gap-1">
        <span className="rounded border border-slate-200 px-2 py-1">Filtr</span>
        <span className="rounded bg-slate-900 px-2 py-1 text-white">Nová</span>
      </div>
    </div>
  );
}
