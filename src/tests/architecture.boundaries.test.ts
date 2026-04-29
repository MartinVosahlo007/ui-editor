import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("architecture boundaries", () => {
  it("keeps component manifest free of UI component imports", () => {
    const manifest = source("src/domain/components/component.manifest.ts");

    expect(manifest).not.toContain("../../ui/");
    expect(manifest).not.toContain("PreviewComponent");
    expect(manifest).toContain("previewKey");
  });

  it("keeps status message types out of UI modules for feature hooks", () => {
    const controller = source("src/features/editor/useEditorController.ts");

    expect(controller).not.toContain("../../ui/shared/StatusMessage");
    expect(controller).toContain("../status/useStatusMessage");
  });

  it("keeps nudge and align geometry logic in canvas commands", () => {
    const controller = source("src/features/editor/useEditorController.ts");
    const commands = source("src/domain/canvas/canvas.commands.ts");

    expect(controller).not.toContain("clampElementGeometry");
    expect(controller).not.toContain("CANVAS_CONTENT_BOUNDS");
    expect(commands).toContain("nudgeElement");
    expect(commands).toContain("alignElement");
  });
});
