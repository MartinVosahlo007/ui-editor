export type StatusTone = "info" | "success" | "error";

export interface StatusMessageValue {
  tone: StatusTone;
  text: string;
}

interface StatusMessageProps {
  message: StatusMessageValue | null;
}

const toneClasses: Record<StatusTone, string> = {
  info: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

export function StatusMessage({ message }: StatusMessageProps) {
  if (!message) return null;

  return (
    <span className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${toneClasses[message.tone]}`}>
      {message.text}
    </span>
  );
}
