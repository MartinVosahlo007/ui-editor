import { Icon } from "../../shared/Icon";

const auditTrailItems = [
  ["28. 4. 10:42", "Změna částky", "88 900 → 91 400 Kč"],
  ["28. 4. 09:15", "Přidána příloha", "nabidka.pdf"],
  ["27. 4. 16:10", "Změna stavu", "Draft → Čeká"],
  ["27. 4. 14:33", "Vytvořeno", "J. Novák"],
] as const;

export function AuditTrailPreview() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
        <Icon name="history" size={14} />
        Audit trail
      </div>

      {auditTrailItems.map((item) => (
        <div key={item[0]} className="border-l-2 border-slate-200 pb-3 pl-3">
          <div className="font-semibold text-slate-700">{item[1]}</div>
          <div className="text-slate-500">{item[2]}</div>
          <div className="text-[10px] text-slate-400">{item[0]}</div>
        </div>
      ))}
    </div>
  );
}
