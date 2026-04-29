import type { CanvasElement, CanvasElementPatch, CanvasElementPropsPatch } from "../../domain/canvas/canvas.types";
import type { EditorController } from "../../features/editor/useEditorController";
import { CanvasWorkspace } from "./CanvasWorkspace";
import { HeaderBar } from "./HeaderBar";
import { Sidebar } from "./Sidebar";
import { PalettePanel } from "../palette/PalettePanel";

interface EditorShellProps {
  controller: EditorController;
}

export function EditorShell({ controller }: EditorShellProps) {
  const { state, selectedElement, paletteGroups, templates, canUndo, canRedo, actions } = controller;

  const updateElement = (element: CanvasElement, patch: CanvasElementPatch) => {
    actions.updateElement(element.id, patch);
  };

  const updateElementProps = (element: CanvasElement, patch: CanvasElementPropsPatch) => {
    actions.updateElementProps(element.id, patch);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900">
      <HeaderBar
        canUndo={canUndo}
        canRedo={canRedo}
        showGrid={state.showGrid}
        preview={state.preview}
        lastSavedAt={state.lastSavedAt}
        statusMessage={controller.statusMessage}
        onUndo={actions.undo}
        onRedo={actions.redo}
        onDuplicate={actions.duplicateSelectedElement}
        onToggleGrid={actions.toggleGrid}
        onTogglePreview={actions.togglePreview}
        onExportJson={actions.exportJson}
        onImportJson={actions.importJson}
        onSave={actions.save}
        onReset={actions.reset}
      />

      <main className="grid h-[calc(100vh-56px)] grid-cols-[300px_1fr_340px] gap-0">
        <PalettePanel
          groups={paletteGroups}
          templates={templates}
          onAddItem={actions.addPaletteItem}
          onApplyTemplate={actions.applyTemplate}
        />

        <CanvasWorkspace
          elements={state.elements}
          selectedId={state.selectedId}
          zoom={state.zoom}
          showGrid={state.showGrid}
          preview={state.preview}
          onClearSelection={actions.clearSelection}
          onSelectElement={actions.selectElement}
          onInteractionStart={actions.captureHistory}
          onMoveElement={(id, x, y) => actions.updateElement(id, { x, y }, { trackHistory: false })}
          onResizeElement={(id, w, h) => actions.updateElement(id, { w, h }, { trackHistory: false })}
          onAlign={actions.alignSelectedElement}
          onZoomIn={actions.zoomIn}
          onZoomOut={actions.zoomOut}
        />

        <Sidebar
          elements={state.elements}
          selectedId={state.selectedId}
          selectedElement={selectedElement}
          onSelectElement={actions.selectElement}
          onElementChange={updateElement}
          onPropsChange={updateElementProps}
          onDelete={(element) => actions.deleteElement(element.id)}
        />
      </main>
    </div>
  );
}
