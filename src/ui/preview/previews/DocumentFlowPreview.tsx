import { Fragment } from "react";

const documentFlowSteps = ["Nabídka", "Objednávka", "Výdejka", "Faktura", "Úhrada"] as const;

export function DocumentFlowPreview() {
  return (
    <div className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
      {documentFlowSteps.map((step, index) => (
        <Fragment key={step}>
          <div className="min-w-24 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center shadow-sm">
            <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-bold text-slate-700 ring-1 ring-slate-200">
              {index + 1}
            </div>
            <div className="text-xs font-semibold text-slate-700">{step}</div>
            <div className="text-[10px] text-slate-400">ERP doklad</div>
          </div>

          {index < documentFlowSteps.length - 1 && <div className="mx-2 h-px flex-1 bg-slate-300" />}
        </Fragment>
      ))}
    </div>
  );
}
