import { classNames } from "../../../shared/classNames";

const fields = ["Zákazník", "Datum dokladu", "Účetní období", "Středisko", "Měna", "Poznámka"] as const;

export function FormPanelPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="mb-3 font-semibold text-slate-700">Detail/editace záznamu</div>

      <div className="grid grid-cols-2 gap-2">
        {fields.map((field, index) => (
          <label key={field} className={classNames("block", index === 5 && "col-span-2")}>
            <span className="mb-1 block text-[10px] uppercase text-slate-400">{field}</span>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
              {index === 5 ? "Textarea / rich text" : "Lookup / input"}
            </div>
          </label>
        ))}
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <span className="rounded-xl border px-3 py-2">Zrušit</span>
        <span className="rounded-xl bg-slate-900 px-3 py-2 text-white">Uložit</span>
      </div>
    </div>
  );
}
