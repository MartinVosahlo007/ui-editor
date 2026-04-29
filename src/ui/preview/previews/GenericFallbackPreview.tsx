import { Icon } from "../../shared/Icon";

interface GenericFallbackPreviewProps {
  label: string;
}

export function GenericFallbackPreview({ label }: GenericFallbackPreviewProps) {
  return (
    <div className="grid h-full place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-xs text-slate-500">
      <div>
        <Icon name="boxes" className="mx-auto mb-2" size={22} />
        <b>{label}</b>
        <br />
        wireframe blok
      </div>
    </div>
  );
}
