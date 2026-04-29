import type { PropsWithChildren } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../domain/canvas/canvas.constants";
import { classNames } from "../../shared/classNames";

interface GridBackgroundProps {
  showGrid: boolean;
  zoom: number;
}

export function GridBackground({ showGrid, zoom, children }: PropsWithChildren<GridBackgroundProps>) {
  return (
    <div
      className={classNames(
        "relative mx-auto origin-top-left rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-300",
        showGrid && "bg-grid"
      )}
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, transform: `scale(${zoom})` }}
    >
      {children}
    </div>
  );
}
