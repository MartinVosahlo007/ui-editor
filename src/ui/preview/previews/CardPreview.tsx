import { Icon } from "../../shared/Icon";

export function CardPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-[11px] text-slate-600">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <Icon name="panel" size={14} />
          Detail zakázky
        </div>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">Draft</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <span className="rounded bg-slate-50 px-2 py-1">Zákazník</span>
        <span className="rounded bg-slate-50 px-2 py-1">Termín</span>
        <span className="rounded bg-slate-50 px-2 py-1">Částka</span>
        <span className="rounded bg-slate-50 px-2 py-1">Stav</span>
      </div>
    </div>
  );
}
