import { describe, expect, it } from "vitest";
import { COMPONENT_DEFINITIONS, COMPONENT_KINDS } from "../domain/components/component.manifest";
import { componentPreviewRegistry } from "../ui/preview/previewRegistry";

describe("component manifest", () => {
  it("defines every component kind exactly once", () => {
    expect(COMPONENT_DEFINITIONS).toHaveLength(COMPONENT_KINDS.length);

    for (const kind of COMPONENT_KINDS) {
      const definition = COMPONENT_DEFINITIONS.find((component) => component.type === kind);

      expect(definition).toBeDefined();
      expect(definition?.previewKey).toBeDefined();
    }
  });

  it("has preview registry coverage for every component kind", () => {
    for (const kind of COMPONENT_KINDS) {
      expect(componentPreviewRegistry[kind]).toBeDefined();
    }
  });
});
