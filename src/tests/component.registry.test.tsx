import { describe, expect, it } from "vitest";
import { componentPreviewRegistry } from "../ui/preview/previewRegistry";


describe("component preview registry", () => {
  it("contains critical ERP preview renderers", () => {
    expect(componentPreviewRegistry.dataGrid).toBeDefined();
    expect(componentPreviewRegistry.quickFilters).toBeDefined();
    expect(componentPreviewRegistry.documentFlow).toBeDefined();
    expect(componentPreviewRegistry.kanban).toBeDefined();
  });
});
