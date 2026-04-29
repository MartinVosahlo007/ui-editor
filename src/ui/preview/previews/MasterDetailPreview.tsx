import { DataGridPreview } from "./DataGridPreview";

export function MasterDetailPreview() {
  return (
    <div className="grid h-full grid-rows-[1fr_120px] gap-2">
      <DataGridPreview density="compact" />
      <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
        <b>Detail row:</b> položky dokladu, vazby, komentáře, přílohy, audit.
      </div>
    </div>
  );
}
