import { useCallback } from "react";
import type { Dispatch } from "react";
import type { EditorAction } from "../../domain/canvas/canvas.types";
import { createElementsFromTemplate } from "../../domain/templates/template.factory";
import { saveEditorDocument } from "../persistence/editorStorage";
import type { StatusMessageValue } from "../../shared/status.types";

interface UseResetDocumentOptions {
  dispatch: Dispatch<EditorAction>;
  setTimedStatus: (message: StatusMessageValue) => void;
}

export function useResetDocument({ dispatch, setTimedStatus }: UseResetDocumentOptions) {
  return useCallback(() => {
    const elements = createElementsFromTemplate("erpList");
    const savedAt = new Date().toISOString();

    dispatch({ type: "RESET", elements });
    saveEditorDocument({
      version: 1,
      name: "ERP Wireframe",
      elements,
      selectedId: null,
      savedAt,
    });
    dispatch({ type: "MARK_SAVED", savedAt });
    setTimedStatus({ tone: "success", text: "Reset hotový" });
  }, [dispatch, setTimedStatus]);
}
