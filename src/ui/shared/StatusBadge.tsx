import { classNames } from "../../shared/classNames";

interface StatusBadgeProps {
  value: string;
}

export function StatusBadge({ value }: StatusBadgeProps) {
  const tone =
    value === "Schváleno"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : value === "Riziko"
        ? "bg-rose-50 text-rose-700 ring-rose-200"
        : value === "Čeká"
          ? "bg-amber-50 text-amber-700 ring-amber-200"
          : "bg-slate-50 text-slate-600 ring-slate-200";

  return <span className={classNames("rounded-full px-2 py-0.5 text-[10px] ring-1", tone)}>{value}</span>;
}
