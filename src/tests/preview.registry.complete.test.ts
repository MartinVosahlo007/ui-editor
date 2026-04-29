import { describe, expect, it } from "vitest";
import { COMPONENT_KINDS } from "../domain/components/component.manifest";
import { resolvePreviewComponent } from "../ui/preview/previewRegistry";
import type { CanvasElement } from "../domain/canvas/canvas.types";

function element(type: CanvasElement["type"]): CanvasElement {
  return {
    id: type,
    type,
    label: type,
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
  };
}

describe("preview registry completeness", () => {
  it("resolves a preview component for every manifest component kind", () => {
    for (const kind of COMPONENT_KINDS) {
      expect(resolvePreviewComponent(element(kind))).toBeTypeOf("function");
    }
  });
});
