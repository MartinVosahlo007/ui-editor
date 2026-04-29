import { Icon } from "../../shared/Icon";

export function SearchBarPreview() {
  return (
    <div className="flex h-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-500">
      <Icon name="search" size={18} />
      Ctrl+K — najít modul, doklad, zákazníka, akci…
    </div>
  );
}
