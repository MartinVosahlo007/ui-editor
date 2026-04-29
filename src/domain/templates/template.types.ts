import type { ComponentKind } from "../components/component.types";

export type TemplateKey = "erpList" | "documentFlow" | "dashboard";

export interface TemplateDefinition {
  key: TemplateKey;
  label: string;
  icon: string;
}

export interface TemplateElementDefinition {
  type: ComponentKind;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
