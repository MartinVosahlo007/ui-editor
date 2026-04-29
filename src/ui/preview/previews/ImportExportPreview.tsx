import { Icon } from "../../shared/Icon";

export function ImportExportPreview() {
  return (
    <div className="grid h-full grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="rounded-xl border p-3">
        <Icon name="upload" size={16} />
        CSV/Excel import
      </div>

      <div className="rounded-xl border p-3">
        <Icon name="download" size={16} />
        CSV/XLSX/PDF export
      </div>

      <div className="col-span-2 rounded-xl bg-slate-50 p-3">Print preview + mapování sloupců</div>
    </div>
  );
}
