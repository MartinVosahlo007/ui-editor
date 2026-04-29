import {
  CANVAS_HEIGHT,
  CANVAS_TOP_BAR_HEIGHT,
  CANVAS_WIDTH,
  MIN_ELEMENT_HEIGHT,
  MIN_ELEMENT_WIDTH,
} from "./canvas.constants";
import { clamp } from "./canvas.helpers";
import type { CanvasElement } from "./canvas.types";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const CANVAS_CONTENT_BOUNDS: Rect = {
  x: 0,
  y: 0,
  w: CANVAS_WIDTH,
  h: CANVAS_HEIGHT - CANVAS_TOP_BAR_HEIGHT,
};

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

export function sanitizeNumberInput(value: string, fallback: number): number {
  if (value.trim() === "") return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function clampElementSize(element: CanvasElement): CanvasElement {
  return {
    ...element,
    w: clamp(finiteOr(element.w, MIN_ELEMENT_WIDTH), MIN_ELEMENT_WIDTH, CANVAS_WIDTH),
    h: clamp(
      finiteOr(element.h, MIN_ELEMENT_HEIGHT),
      MIN_ELEMENT_HEIGHT,
      CANVAS_HEIGHT - CANVAS_TOP_BAR_HEIGHT
    ),
  };
}

export function clampElementPosition(element: CanvasElement, canvasBounds: Rect): CanvasElement {
  const sized = clampElementSize(element);

  return {
    ...sized,
    x: clamp(finiteOr(sized.x, canvasBounds.x), canvasBounds.x, canvasBounds.x + canvasBounds.w - sized.w),
    y: clamp(finiteOr(sized.y, canvasBounds.y), canvasBounds.y, canvasBounds.y + canvasBounds.h - sized.h),
  };
}

export function clampElementGeometry(element: CanvasElement): CanvasElement {
  return clampElementPosition(clampElementSize(element), CANVAS_CONTENT_BOUNDS);
}
