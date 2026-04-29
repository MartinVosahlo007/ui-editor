import type { PaletteGroup } from "./palette.types";
import { COMPONENT_DEFINITIONS } from "../components/component.manifest";

const groupIcons: Record<string, PaletteGroup["icon"]> = {
  Layout: "grid",
  "Tabulky a dlouhé seznamy": "table",
  "Filtrace a hledání": "filter",
  "ERP komponenty": "workflow",
  "Formuláře a akce": "settings",
  Dashboard: "dashboard",
};

export const PALETTE_GROUPS: PaletteGroup[] = Object.entries(
  COMPONENT_DEFINITIONS.reduce<Record<string, typeof COMPONENT_DEFINITIONS>>((groups, definition) => {
    groups[definition.category] = [...(groups[definition.category] ?? []), definition];
    return groups;
  }, {})
).map(([name, definitions]) => ({
  name,
  icon: groupIcons[name] ?? "grid",
  items: definitions.map((definition) => ({
    type: definition.type,
    label: definition.label,
    w: definition.defaultSize.w,
    h: definition.defaultSize.h,
  })),
}));
