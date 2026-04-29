import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import {
  createInitialEditorState,
  editorReducer,
} from "../../domain/canvas/canvas.reducer";
import { createElementsFromTemplate } from "../../domain/templates/template.factory";
import { useEditorController, type EditorController } from "../../features/editor/useEditorController";
import { useKeyboardShortcuts } from "../../features/editor/useKeyboardShortcuts";
import { loadEditorDocument } from "../../features/persistence/editorStorage";

const EditorContext = createContext<EditorController | null>(null);

function createBootState() {
  const savedDocument = loadEditorDocument();
  const state = createInitialEditorState(
    savedDocument?.elements ?? createElementsFromTemplate("erpList"),
    savedDocument?.selectedId ?? null
  );

  return {
    ...state,
    lastSavedAt: savedDocument?.savedAt ?? null,
  };
}

export function EditorProvider({ children }: PropsWithChildren) {
  const initialState = useMemo(createBootState, []);
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const controller = useEditorController(state, dispatch);

  useKeyboardShortcuts({
    enabled: !state.preview,
    actions: {
      undo: controller.actions.undo,
      redo: controller.actions.redo,
      deleteSelectedElement: controller.actions.deleteSelectedElement,
      duplicateSelectedElement: controller.actions.duplicateSelectedElement,
      nudgeSelectedElement: controller.actions.nudgeSelectedElement,
    },
  });

  return <EditorContext.Provider value={controller}>{children}</EditorContext.Provider>;
}

export function useEditor(): EditorController {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used inside EditorProvider");
  }

  return context;
}
