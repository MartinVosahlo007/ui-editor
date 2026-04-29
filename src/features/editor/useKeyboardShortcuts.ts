import { useEffect } from "react";
import { GRID_SNAP } from "../../domain/canvas/canvas.constants";

export interface KeyboardShortcutActions {
  undo: () => void;
  redo: () => void;
  deleteSelectedElement: () => void;
  duplicateSelectedElement: () => void;
  nudgeSelectedElement: (deltaX: number, deltaY: number) => void;
}

interface UseKeyboardShortcutsOptions {
  enabled: boolean;
  actions: KeyboardShortcutActions;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || target.isContentEditable;
}

export function useKeyboardShortcuts({ enabled, actions }: UseKeyboardShortcutsOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const modifierPressed = event.metaKey || event.ctrlKey;

      if (modifierPressed && event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        actions.undo();
        return;
      }

      if (
        (modifierPressed && event.key.toLowerCase() === "y") ||
        (modifierPressed && event.shiftKey && event.key.toLowerCase() === "z")
      ) {
        event.preventDefault();
        actions.redo();
        return;
      }

      if (modifierPressed && event.key.toLowerCase() === "d") {
        event.preventDefault();
        actions.duplicateSelectedElement();
        return;
      }

      if (event.key.startsWith("Arrow")) {
        const amount = event.shiftKey ? 16 : GRID_SNAP;
        const deltaByKey: Record<string, [number, number]> = {
          ArrowLeft: [-amount, 0],
          ArrowRight: [amount, 0],
          ArrowUp: [0, -amount],
          ArrowDown: [0, amount],
        };
        const delta = deltaByKey[event.key];

        if (delta) {
          event.preventDefault();
          actions.nudgeSelectedElement(delta[0], delta[1]);
          return;
        }
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        actions.deleteSelectedElement();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions, enabled]);
}
