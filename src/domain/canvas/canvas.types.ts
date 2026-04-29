import type { ComponentKind } from "../components/component.types";

export type CanvasElementId = string;
export type Density = "compact" | "default" | "comfortable";

export interface CanvasElementProps {
  density: Density;
  dataBinding: string;
  sticky: boolean;
  frozenColumns: number;
  virtualScroll: boolean;
  inlineEdit: boolean;
  batchEdit: boolean;
}

export interface CanvasElement {
  id: CanvasElementId;
  type: ComponentKind;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  props: CanvasElementProps;
}

export type CanvasElementPatch = Partial<Omit<CanvasElement, "id" | "props">>;
export type CanvasElementPropsPatch = Partial<CanvasElementProps>;

export interface EditorSnapshot {
  elements: CanvasElement[];
  selectedId: CanvasElementId | null;
}

export interface EditorHistory {
  past: EditorSnapshot[];
  future: EditorSnapshot[];
}

export interface EditorState extends EditorSnapshot {
  zoom: number;
  showGrid: boolean;
  preview: boolean;
  history: EditorHistory;
  lastSavedAt: string | null;
}

export type EditorAction =
  | { type: "ADD_ELEMENT"; element: CanvasElement }
  | { type: "APPLY_TEMPLATE"; elements: CanvasElement[] }
  | { type: "SELECT_ELEMENT"; id: CanvasElementId | null }
  | {
      type: "UPDATE_ELEMENT";
      id: CanvasElementId;
      patch: CanvasElementPatch;
      trackHistory?: boolean;
    }
  | {
      type: "UPDATE_ELEMENT_PROPS";
      id: CanvasElementId;
      patch: CanvasElementPropsPatch;
      trackHistory?: boolean;
    }
  | { type: "DELETE_ELEMENT"; id: CanvasElementId }
  | { type: "CAPTURE_HISTORY" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "TOGGLE_GRID" }
  | { type: "TOGGLE_PREVIEW" }
  | { type: "MARK_SAVED"; savedAt: string }
  | { type: "LOAD_DOCUMENT"; elements: CanvasElement[]; selectedId?: CanvasElementId | null }
  | { type: "RESET"; elements: CanvasElement[] };
