import type { ComponentKind } from "../components/component.types";

export type PaletteIconName =
  | "grid"
  | "table"
  | "filter"
  | "workflow"
  | "settings"
  | "dashboard";

export interface PaletteItem {
  type: ComponentKind;
  label: string;
  w: number;
  h: number;
}

export interface PaletteGroup {
  name: string;
  icon: PaletteIconName;
  items: PaletteItem[];
}
