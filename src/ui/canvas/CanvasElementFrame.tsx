import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { CanvasElement } from "../../domain/canvas/canvas.types";
import { classNames } from "../../shared/classNames";
import { ResizeHandle } from "./ResizeHandle";

interface CanvasElementFrameProps {
  element: CanvasElement;
  selected: boolean;
  preview: boolean;
  children: ReactNode;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onResizePointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

export function CanvasElementFrame({
  element,
  selected,
  preview,
  children,
  onPointerDown,
  onResizePointerDown,
}: CanvasElementFrameProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      className={classNames(
        "absolute select-none overflow-hidden rounded-2xl border bg-white/95 shadow-sm backdrop-blur",
        preview
          ? "border-transparent"
          : selected
            ? "border-slate-900 ring-2 ring-slate-900/15"
            : "border-slate-200 hover:border-slate-400"
      )}
      style={{
        left: element.x,
        top: element.y,
        width: element.w,
        height: element.h,
      }}
    >
      {!preview && (
        <div className="flex h-7 cursor-move items-center justify-between border-b border-slate-200 bg-slate-50 px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          <span className="truncate">{element.label}</span>
          <span className="rounded bg-white px-1.5 py-0.5 text-[9px] text-slate-400">{element.type}</span>
        </div>
      )}

      <div className={classNames("overflow-hidden p-2", preview ? "h-full" : "h-[calc(100%-28px)]")}>{children}</div>

      {selected && !preview && <ResizeHandle onPointerDown={onResizePointerDown} />}
    </div>
  );
}
