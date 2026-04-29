import type { PaletteGroup as PaletteGroupModel, PaletteItem } from "../../domain/palette/palette.types";
import { Icon } from "../shared/Icon";
import { PaletteItemButton } from "./PaletteItemButton";

interface PaletteGroupProps {
  group: PaletteGroupModel;
  onAdd: (item: PaletteItem) => void;
}

export function PaletteGroup({ group, onAdd }: PaletteGroupProps) {
  return (
    <section className="mb-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        <Icon name={group.icon} size={14} />
        {group.name}
      </div>

      <div className="grid gap-2">
        {group.items.map((item) => (
          <PaletteItemButton key={item.type} item={item} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
