export function SplitterPreview() {
  return (
    <div className="grid h-full grid-cols-[1fr_6px_1fr] rounded-xl border border-slate-200 bg-white text-xs">
      <div className="p-3">Levý panel</div>
      <div className="bg-slate-200" />
      <div className="p-3">Pravý panel</div>
    </div>
  );
}
