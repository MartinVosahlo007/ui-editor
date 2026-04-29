import { EditorContainer } from "./EditorContainer";
import { EditorProvider } from "./providers/EditorProvider";

export function App() {
  return (
    <EditorProvider>
      <EditorContainer />
    </EditorProvider>
  );
}
