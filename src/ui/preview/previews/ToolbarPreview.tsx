import { Icon } from "../../shared/Icon";

export function ToolbarPreview() {
  return (
    <div className="flex h-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs">
      <span className="font-semibold text-slate-700">Zakázky</span>
      <span className="rounded-xl bg-slate-900 px-3 py-2 text-white">+ Nový</span>
      <span className="rounded-xl border px-3 py-2">Editovat</span>
      <span className="rounded-xl border px-3 py-2">Schválit</span>
      <span className="rounded-xl border px-3 py-2">Export</span>
      <span className="ml-auto flex items-center gap-1 text-slate-500">
        <Icon name="sliders" size={14} />
        Sloupce / zobrazení
      </span>
    </div>
  );
}
