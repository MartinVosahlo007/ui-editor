import { describe, expect, it } from "vitest";
import { CANVAS_HEIGHT, CANVAS_TOP_BAR_HEIGHT, CANVAS_WIDTH } from "../domain/canvas/canvas.constants";
import { createInitialEditorState, editorReducer } from "../domain/canvas/canvas.reducer";
import { duplicateElement } from "../domain/canvas/canvas.commands";
import type { CanvasElement } from "../domain/canvas/canvas.types";

function element(overrides: Partial<CanvasElement> = {}): CanvasElement {
  return {
    id: "element-1",
    type: "card",
    label: "Card",
    x: 0,
    y: 0,
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

describe("canvas geometry boundaries", () => {
  it("clamps element updates to the canvas content area", () => {
    const state = createInitialEditorState([element()]);
    const next = editorReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "element-1",
      patch: { x: 9999, y: 9999, w: 9999, h: 9999 },
    });
    const updated = next.elements[0];

    expect(updated.x + updated.w).toBe(CANVAS_WIDTH);
    expect(updated.y + updated.h).toBe(CANVAS_HEIGHT - CANVAS_TOP_BAR_HEIGHT);
  });

  it("duplicates an element with a new id, offset position, and selection", () => {
    const original = element({ x: 8, y: 12 });
    const copy = duplicateElement(original);

    expect(copy.id).not.toBe(original.id);
    expect(copy.x).toBe(24);
    expect(copy.y).toBe(28);
  });

  it("handles duplicate action as one undoable step", () => {
    const state = createInitialEditorState([element()], "element-1");
    const next = editorReducer(state, { type: "DUPLICATE_ELEMENT", id: "element-1" });

    expect(next.elements).toHaveLength(2);
    expect(next.selectedId).toBe(next.elements[1].id);
    expect(next.history.past).toHaveLength(1);
  });
});
