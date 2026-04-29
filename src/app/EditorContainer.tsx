import { useEditor } from "./providers/EditorProvider";
import { EditorShell } from "../ui/layout/EditorShell";

export function EditorContainer() {
  const editor = useEditor();

  return <EditorShell controller={editor} />;
}
