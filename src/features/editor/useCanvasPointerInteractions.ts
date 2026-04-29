import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  MIN_ELEMENT_HEIGHT,
  MIN_ELEMENT_WIDTH,
} from "../../domain/canvas/canvas.constants";
import { snapToGrid } from "../../domain/canvas/canvas.helpers";
import type { CanvasElement, CanvasElementId } from "../../domain/canvas/canvas.types";

interface UseCanvasPointerInteractionsOptions {
  zoom: number;
  preview: boolean;
  onSelect: (id: CanvasElementId) => void;
  onInteractionStart: () => void;
  onMove: (id: CanvasElementId, x: number, y: number) => void;
  onResize: (id: CanvasElementId, width: number, height: number) => void;
}

type PointerHandler = (event: ReactPointerEvent<HTMLElement>) => void;

export interface CanvasPointerInteractions {
  createDragStartHandler: (element: CanvasElement) => PointerHandler;
  createResizeStartHandler: (element: CanvasElement) => PointerHandler;
}

export function useCanvasPointerInteractions({
  zoom,
  preview,
  onSelect,
  onInteractionStart,
  onMove,
  onResize,
}: UseCanvasPointerInteractionsOptions): CanvasPointerInteractions {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  const registerWindowListeners = useCallback((onPointerMove: (event: PointerEvent) => void) => {
    cleanupRef.current?.();

    const cleanup = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", cleanup);
      window.removeEventListener("pointercancel", cleanup);
      cleanupRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", cleanup);
    window.addEventListener("pointercancel", cleanup);
    cleanupRef.current = cleanup;
  }, []);

  const createDragStartHandler = useCallback(
    (element: CanvasElement): PointerHandler =>
      (event) => {
        if (preview) return;

        event.stopPropagation();
        onSelect(element.id);
        onInteractionStart();

        const startX = event.clientX;
        const startY = event.clientY;
        const originX = element.x;
        const originY = element.y;

        registerWindowListeners((moveEvent) => {
          const deltaX = (moveEvent.clientX - startX) / zoom;
          const deltaY = (moveEvent.clientY - startY) / zoom;

          onMove(element.id, snapToGrid(originX + deltaX), snapToGrid(originY + deltaY));
        });
      },
    [onInteractionStart, onMove, onSelect, preview, registerWindowListeners, zoom]
  );

  const createResizeStartHandler = useCallback(
    (element: CanvasElement): PointerHandler =>
      (event) => {
        if (preview) return;

        event.stopPropagation();
        onSelect(element.id);
        onInteractionStart();

        const startX = event.clientX;
        const startY = event.clientY;
        const originWidth = element.w;
        const originHeight = element.h;

        registerWindowListeners((moveEvent) => {
          const deltaWidth = (moveEvent.clientX - startX) / zoom;
          const deltaHeight = (moveEvent.clientY - startY) / zoom;

          onResize(
            element.id,
            Math.max(MIN_ELEMENT_WIDTH, snapToGrid(originWidth + deltaWidth)),
            Math.max(MIN_ELEMENT_HEIGHT, snapToGrid(originHeight + deltaHeight))
          );
        });
      },
    [onInteractionStart, onResize, onSelect, preview, registerWindowListeners, zoom]
  );

  return {
    createDragStartHandler,
    createResizeStartHandler,
  };
}
