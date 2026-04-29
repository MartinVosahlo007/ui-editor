import { DEFAULT_ELEMENT_PROPS } from "../canvas/canvas.constants";
import { createId } from "../canvas/canvas.helpers";
import type { CanvasElement } from "../canvas/canvas.types";
import { TEMPLATE_ELEMENTS } from "./template.data";
import type { TemplateKey } from "./template.types";

export function createElementsFromTemplate(templateKey: TemplateKey): CanvasElement[] {
  return TEMPLATE_ELEMENTS[templateKey].map((element) => ({
    id: createId(),
    props: { ...DEFAULT_ELEMENT_PROPS },
    ...element,
  }));
}
