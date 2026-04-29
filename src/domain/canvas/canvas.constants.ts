import type { CanvasElementProps } from "./canvas.types";

export const CANVAS_WIDTH = 1240;
export const CANVAS_HEIGHT = 820;
export const CANVAS_TOP_BAR_HEIGHT = 40;
export const GRID_SNAP = 4;
export const MIN_ELEMENT_WIDTH = 180;
export const MIN_ELEMENT_HEIGHT = 56;
export const MAX_HISTORY_ITEMS = 50;
export const DEFAULT_ZOOM = 0.85;
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.4;

export const DEFAULT_ELEMENT_PROPS: CanvasElementProps = {
  density: "compact",
  dataBinding: "ERP.Mock",
  sticky: false,
  frozenColumns: 2,
  virtualScroll: true,
  inlineEdit: false,
  batchEdit: false,
};
