const rows = [
  ["▾ Finance", "Rozpočty", "128"],
  ["  ├─ Účetní deník", "Modul", "4 982"],
  ["  └─ Faktury", "Doklady", "18 230"],
  ["▸ Sklad", "Zásoby", "9 140"],
  ["▸ Projekty", "Zakázky", "724"],
] as const;

export function TreeGridPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white text-xs">
      <div className="border-b bg-slate-50 px-3 py-2 font-semibold text-slate-700">Hierarchie modulů / položek</div>

      {rows.map((row) => (
        <div key={row[0]} className="grid grid-cols-[1fr_120px_70px] border-b border-slate-100 px-3 py-2 text-slate-700">
          <span>{row[0]}</span>
          <span>{row[1]}</span>
          <span className="text-right">{row[2]}</span>
        </div>
      ))}
    </div>
  );
}
