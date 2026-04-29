import { DEFAULT_ELEMENT_PROPS } from "./canvas.constants";
import { createId } from "./canvas.helpers";
import type { CanvasElement } from "./canvas.types";
import type { PaletteItem } from "../palette/palette.types";

export function createElementFromPaletteItem(
  item: PaletteItem,
  existingElementCount: number
): CanvasElement {
  const offset = existingElementCount * 16;

  return {
    id: createId(),
    type: item.type,
    label: item.label,
    x: 64 + offset,
    y: 64 + offset,
    w: item.w,
    h: item.h,
    props: { ...DEFAULT_ELEMENT_PROPS },
  };
}
