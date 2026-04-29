import type { ComponentKind } from "../components/component.types";
import type { IconName } from "../../shared/icons";

export type PaletteIconName = IconName;

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
