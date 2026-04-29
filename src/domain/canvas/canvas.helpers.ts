import { GRID_SNAP, MAX_ZOOM, MIN_ZOOM } from "./canvas.constants";
import type { Density } from "./canvas.types";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 11);
}

export function snapToGrid(value: number, snap = GRID_SNAP): number {
  return Math.round(value / snap) * snap;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function clampZoom(value: number): number {
  return Number(clamp(value, MIN_ZOOM, MAX_ZOOM).toFixed(2));
}

export function densityClasses(density: Density): string {
  if (density === "compact") return "text-[10px] leading-tight";
  if (density === "comfortable") return "text-xs leading-relaxed";
  return "text-[11px]";
}
