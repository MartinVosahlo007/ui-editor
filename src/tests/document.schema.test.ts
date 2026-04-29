import { describe, expect, it } from "vitest";
import { parseEditorDocument } from "../domain/document/document.schema";
import type { EditorDocument } from "../domain/document/document.types";

const validDocument: EditorDocument = {
  version: 1,
  name: "ERP Wireframe",
  selectedId: "element-1",
  savedAt: "2026-04-29T08:00:00.000Z",
  elements: [
    {
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
    },
  ],
};

describe("document schema", () => {
  it("accepts a valid document", () => {
    expect(parseEditorDocument(validDocument).success).toBe(true);
  });

  it("rejects non-finite geometry values", () => {
    const result = parseEditorDocument({
      ...validDocument,
      elements: [{ ...validDocument.elements[0], x: Number.NaN }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a selected id that is missing from elements", () => {
    const result = parseEditorDocument({ ...validDocument, selectedId: "missing" });

    expect(result.success).toBe(false);
  });
});
