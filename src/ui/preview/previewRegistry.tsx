import type { CanvasElement } from "../../domain/canvas/canvas.types";
import type { ComponentKind } from "../../domain/components/component.types";
import { COMPONENT_DEFINITIONS } from "../../domain/components/component.manifest";
import { GenericFallbackPreview } from "./previews/GenericFallbackPreview";
import type { ComponentType } from "react";

interface PreviewComponentProps {
  element: CanvasElement;
}

type PreviewComponent = ComponentType<PreviewComponentProps>;

export const componentPreviewRegistry: Record<ComponentKind, PreviewComponent> =
  Object.fromEntries(
    COMPONENT_DEFINITIONS.map((definition) => [definition.type, definition.PreviewComponent])
  ) as Record<ComponentKind, PreviewComponent>;

export function resolvePreviewComponent(element: CanvasElement): PreviewComponent {
  return (
    componentPreviewRegistry[element.type] ??
    (({ element: fallbackElement }) => (
      <GenericFallbackPreview label={fallbackElement.label || fallbackElement.type} />
    ))
  );
}
