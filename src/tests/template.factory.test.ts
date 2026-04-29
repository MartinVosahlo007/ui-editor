import { describe, expect, it } from "vitest";
import { createElementsFromTemplate } from "../domain/templates/template.factory";
import { densityClasses } from "../domain/canvas/canvas.helpers";


describe("template factory", () => {
  it("creates elements with ids and default props", () => {
    const elements = createElementsFromTemplate("dashboard");

    expect(elements.length).toBeGreaterThan(0);
    expect(elements.every((element) => element.id && element.props)).toBe(true);
  });

  it("keeps density utility values distinct", () => {
    expect(densityClasses("compact")).not.toBe(densityClasses("comfortable"));
  });
});
