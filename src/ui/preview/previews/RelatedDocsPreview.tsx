import { Icon } from "../../shared/Icon";

export function RelatedDocsPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-[11px] text-slate-600">
      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-800">
        <Icon name="git" size={14} />
        Navazující doklady
      </div>
      <div className="space-y-1.5">
        {["Objednávka", "Dodací list", "Faktura"].map((label) => (
          <div key={label} className="flex items-center justify-between rounded bg-slate-50 px-2 py-1">
            <span>{label}</span>
            <span className="text-slate-400">otevřít</span>
          </div>
        ))}
      </div>
    </div>
  );
}
