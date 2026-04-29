import { describe, expect, it } from "vitest";
import {
  CANVAS_HEIGHT,
  CANVAS_TOP_BAR_HEIGHT,
  CANVAS_WIDTH,
  MIN_ELEMENT_HEIGHT,
  MIN_ELEMENT_WIDTH,
} from "../domain/canvas/canvas.constants";
import {
  clampElementGeometry,
  clampElementPosition,
  clampElementSize,
  sanitizeNumberInput,
} from "../domain/canvas/geometry.helpers";
import type { CanvasElement } from "../domain/canvas/canvas.types";

function element(overrides: Partial<CanvasElement> = {}): CanvasElement {
  return {
    id: "element-1",
    type: "card",
    label: "Card",
    x: 12,
    y: 16,
    w: 240,
    h: 120,
    props: {
      density: "compact",
      dataBinding: "ERP.Mock",
      sticky: false,
      frozenColumns: 2,
      virtualScroll: true,
      inlineEdit: false,
      batchEdit: false,
    },
    ...overrides,
  };
}

describe("geometry helpers", () => {
  it("uses fallback for blank or invalid number input", () => {
    expect(sanitizeNumberInput("", 42)).toBe(42);
    expect(sanitizeNumberInput("   ", 42)).toBe(42);
    expect(sanitizeNumberInput("abc", 42)).toBe(42);
    expect(sanitizeNumberInput("Infinity", 42)).toBe(42);
    expect(sanitizeNumberInput("24", 42)).toBe(24);
  });

  it("clamps element size to minimum dimensions", () => {
    const clamped = clampElementSize(element({ w: 1, h: 2 }));

    expect(clamped.w).toBe(MIN_ELEMENT_WIDTH);
    expect(clamped.h).toBe(MIN_ELEMENT_HEIGHT);
  });

  it("clamps element position inside the canvas content area", () => {
    const clamped = clampElementPosition(
      element({ x: 9999, y: 9999, w: 300, h: 100 }),
      { x: 0, y: 0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT - CANVAS_TOP_BAR_HEIGHT }
    );

    expect(clamped.x + clamped.w).toBe(CANVAS_WIDTH);
    expect(clamped.y + clamped.h).toBe(CANVAS_HEIGHT - CANVAS_TOP_BAR_HEIGHT);
  });

  it("clamps negative and non-finite geometry values", () => {
    const clamped = clampElementGeometry(
      element({ x: -10, y: Number.NaN, w: Number.POSITIVE_INFINITY, h: -20 })
    );

    expect(clamped.x).toBe(0);
    expect(clamped.y).toBe(0);
    expect(clamped.w).toBe(MIN_ELEMENT_WIDTH);
    expect(clamped.h).toBe(MIN_ELEMENT_HEIGHT);
  });
});
