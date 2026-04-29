const kpiCards = [
  ["Tržby", "4,82M", "+12%"],
  ["Otevřené", "1 284", "-3%"],
  ["Po splatnosti", "72", "+8"],
  ["SLA", "98,2%", "+0,4"],
] as const;

export function KpiCardsPreview() {
  return (
    <div className="grid h-full grid-cols-4 gap-3">
      {kpiCards.map((card) => (
        <div key={card[0]} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] uppercase text-slate-400">{card[0]}</div>
          <div className="mt-2 text-2xl font-bold text-slate-800">{card[1]}</div>
          <div className="mt-2 text-xs text-slate-500">Trend {card[2]}</div>
        </div>
      ))}
    </div>
  );
}
