import { StatusBadge } from "../../shared/StatusBadge";

interface StatusChartPreviewProps {
  label: string;
}

export function StatusChartPreview({ label }: StatusChartPreviewProps) {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 text-xs">
      <div className="mb-2 font-semibold text-slate-700">{label}</div>

      <div className="grid h-28 grid-cols-12 items-end gap-1">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="rounded-t bg-slate-200" style={{ height: 20 + ((index * 17) % 70) }} />
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <StatusBadge value="Schváleno" />
        <StatusBadge value="Čeká" />
        <StatusBadge value="Riziko" />
      </div>
    </div>
  );
}
