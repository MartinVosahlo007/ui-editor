import { useEffect } from "react";

export interface KeyboardShortcutActions {
  undo: () => void;
  redo: () => void;
  deleteSelectedElement: () => void;
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

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        actions.deleteSelectedElement();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions, enabled]);
}
