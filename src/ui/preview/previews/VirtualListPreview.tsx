export function VirtualListPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-2 text-xs">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="mb-1 rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
          Řádek virtuálního seznamu #{String(index + 1).padStart(3, "0")}
        </div>
      ))}
    </div>
  );
}
