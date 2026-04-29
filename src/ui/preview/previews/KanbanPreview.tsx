const columns = ["Nové", "V řešení", "Schválení", "Hotovo"] as const;

export function KanbanPreview() {
  return (
    <div className="grid h-full grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs">
      {columns.map((column, columnIndex) => (
        <div key={column} className="rounded-xl bg-white p-2 ring-1 ring-slate-200">
          <div className="mb-2 font-semibold text-slate-700">{column}</div>

          {[1, 2, 3].slice(0, columnIndex === 3 ? 1 : 3).map((itemNumber) => (
            <div key={itemNumber} className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600">
              Proces #{columnIndex + 1}
              {itemNumber} • vlastník
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
