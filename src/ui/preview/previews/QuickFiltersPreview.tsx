import { Icon } from "../../shared/Icon";

const quickFilters = ["Dnes", "Čeká na schválení", "Po splatnosti", "Moje firma"];
const activeChips = [
  ["Stav: otevřené ×", "bg-blue-50 text-blue-700"],
  ["Období: Q2 2026 ×", "bg-violet-50 text-violet-700"],
  ["Limit: > 50k ×", "bg-amber-50 text-amber-700"],
] as const;

export function QuickFiltersPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="flex items-center gap-2">
        <div className="flex min-w-56 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-slate-500">
          <Icon name="search" size={14} />
          Hledat doklad, zákazníka, částku…
        </div>

        {quickFilters.map((filter) => (
          <span key={filter} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
            {filter}
          </span>
        ))}

        <span className="ml-auto rounded-xl bg-slate-900 px-3 py-2 text-white">+ filtr</span>
      </div>

      <div className="flex gap-2 text-[11px] text-slate-500">
        {activeChips.map(([chip, className]) => (
          <span key={chip} className={`rounded-full px-2 py-1 ${className}`}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
