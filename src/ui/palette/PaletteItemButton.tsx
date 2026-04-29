import type { PaletteItem } from "../../domain/palette/palette.types";
import { Icon } from "../shared/Icon";

interface PaletteItemButtonProps {
  item: PaletteItem;
  onAdd: (item: PaletteItem) => void;
}

export function PaletteItemButton({ item, onAdd }: PaletteItemButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onAdd(item)}
      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left text-xs transition hover:border-slate-400 hover:bg-white hover:shadow-sm"
    >
      <span>
        <b className="text-slate-700">{item.label}</b>
        <br />
        <span className="text-slate-400">
          {item.w}×{item.h}px
        </span>
      </span>

      <Icon name="plus" size={16} className="text-slate-400 group-hover:text-slate-900" />
    </button>
  );
}
