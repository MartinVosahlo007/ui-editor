import { describe, expect, it } from "vitest";
import { createInitialEditorState, editorReducer } from "../domain/canvas/canvas.reducer";
import { createElementFromPaletteItem } from "../domain/canvas/canvas.commands";
import { createElementsFromTemplate } from "../domain/templates/template.factory";


describe("editor reducer", () => {
  it("adds an element and makes undo available", () => {
    const state = createInitialEditorState(createElementsFromTemplate("erpList"));
    const element = createElementFromPaletteItem({ type: "dataGrid", label: "Grid", w: 200, h: 120 }, state.elements.length);
    const next = editorReducer(state, { type: "ADD_ELEMENT", element });

    expect(next.elements).toHaveLength(state.elements.length + 1);
    expect(next.selectedId).toBe(element.id);
    expect(next.history.past).toHaveLength(1);
  });

  it("supports undo and redo", () => {
    const state = createInitialEditorState(createElementsFromTemplate("erpList"));
    const element = createElementFromPaletteItem({ type: "card", label: "Card", w: 200, h: 120 }, state.elements.length);
    const afterAdd = editorReducer(state, { type: "ADD_ELEMENT", element });
    const afterUndo = editorReducer(afterAdd, { type: "UNDO" });
    const afterRedo = editorReducer(afterUndo, { type: "REDO" });

    expect(afterUndo.elements).toHaveLength(state.elements.length);
    expect(afterRedo.elements).toHaveLength(afterAdd.elements.length);
  });

  it("deletes an element and clears selection", () => {
    const [first, ...rest] = createElementsFromTemplate("erpList");
    const state = createInitialEditorState([first, ...rest], first.id);
    const next = editorReducer(state, { type: "DELETE_ELEMENT", id: first.id });

    expect(next.elements.some((element) => element.id === first.id)).toBe(false);
    expect(next.selectedId).toBeNull();
  });
});
