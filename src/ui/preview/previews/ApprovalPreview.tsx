import { StatusBadge } from "../../shared/StatusBadge";

const approvalSteps = [
  ["1", "Vytvořil", "J. Novák", "hotovo"],
  ["2", "Kontrola rozpočtu", "Finance", "čeká"],
  ["3", "Manažerské schválení", "Ředitel", "čeká"],
] as const;

export function ApprovalPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="mb-3 font-semibold text-slate-700">Schvalovací workflow</div>

      {approvalSteps.map((step) => (
        <div key={step[0]} className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white font-bold ring-1 ring-slate-200">{step[0]}</span>

          <span className="flex-1">
            <b>{step[1]}</b>
            <br />
            <span className="text-slate-500">{step[2]}</span>
          </span>

          <StatusBadge value={step[3] === "hotovo" ? "Schváleno" : "Čeká"} />
        </div>
      ))}
    </div>
  );
}
