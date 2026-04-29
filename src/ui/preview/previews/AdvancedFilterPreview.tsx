const rules = [
  "Částka je větší než 50 000",
  "Stav je Čeká / Riziko",
  "Datum spadá do aktuálního období",
] as const;

export function AdvancedFilterPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="mb-2 flex items-center justify-between font-semibold text-slate-700">
        <span>Advanced filter builder</span>
        <span>AND / OR</span>
      </div>

      {rules.map((rule, index) => (
        <div key={rule} className="mb-2 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-700">
          <span className="rounded bg-white px-2 py-1 text-[10px] text-slate-500">{index === 0 ? "WHERE" : "AND"}</span>
          {rule}
        </div>
      ))}
    </div>
  );
}
