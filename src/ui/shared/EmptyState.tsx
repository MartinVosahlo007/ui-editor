interface EmptyStateProps {
  children: string;
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}
