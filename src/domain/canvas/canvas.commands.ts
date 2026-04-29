import { DEFAULT_ELEMENT_PROPS } from "./canvas.constants";
import { createId } from "./canvas.helpers";
import { CANVAS_CONTENT_BOUNDS, clampElementGeometry } from "./geometry.helpers";
import type { CanvasElement, CanvasElementId, CanvasElementPatch } from "./canvas.types";
import type { PaletteItem } from "../palette/palette.types";

export type AlignCommand = "left" | "centerX" | "right" | "top" | "middleY" | "bottom";

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

export function duplicateElement(element: CanvasElement): CanvasElement {
  return clampElementGeometry({
    ...element,
    id: createId(),
    x: element.x + 16,
    y: element.y + 16,
    props: { ...element.props },
  });
}

export function nudgeElement(
  element: CanvasElement,
  deltaX: number,
  deltaY: number
): CanvasElementPatch {
  const next = clampElementGeometry({
    ...element,
    x: element.x + deltaX,
    y: element.y + deltaY,
  });

  return { x: next.x, y: next.y };
}

export function alignElement(
  elements: CanvasElement[],
  selectedId: CanvasElementId | null,
  command: AlignCommand
): CanvasElementPatch | null {
  const selectedElement = elements.find((element) => element.id === selectedId);
  if (!selectedElement) return null;

  const patch: CanvasElementPatch = {};

  if (command === "left") patch.x = 0;
  if (command === "centerX") patch.x = Math.round((CANVAS_CONTENT_BOUNDS.w - selectedElement.w) / 2);
  if (command === "right") patch.x = CANVAS_CONTENT_BOUNDS.w - selectedElement.w;
  if (command === "top") patch.y = 0;
  if (command === "middleY") patch.y = Math.round((CANVAS_CONTENT_BOUNDS.h - selectedElement.h) / 2);
  if (command === "bottom") patch.y = CANVAS_CONTENT_BOUNDS.h - selectedElement.h;

  return patch;
}
