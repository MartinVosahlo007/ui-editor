import type { PointerEvent as ReactPointerEvent } from "react";
import { Icon } from "../shared/Icon";

interface ResizeHandleProps {
  onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

export function ResizeHandle({ onPointerDown }: ResizeHandleProps) {
  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      className="absolute bottom-1 right-1 grid h-5 w-5 cursor-nwse-resize place-items-center rounded-lg bg-slate-900 text-white shadow"
      title="Změnit velikost"
    >
      <Icon name="maximize" size={12} />
    </button>
  );
}
