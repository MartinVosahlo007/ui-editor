import type {
  CanvasElement,
  CanvasElementPatch,
  CanvasElementPropsPatch,
  Density,
} from "../../domain/canvas/canvas.types";
import { Button } from "../shared/Button";
import { DataBindingField } from "./DataBindingField";
import { DensityControl } from "./DensityControl";
import { GeometryFields } from "./GeometryFields";
import { MetadataPanel } from "./MetadataPanel";

interface ElementInspectorProps {
  element: CanvasElement;
  onElementChange: (patch: CanvasElementPatch) => void;
  onPropsChange: (patch: CanvasElementPropsPatch) => void;
  onDelete: () => void;
}

export function ElementInspector({ element, onElementChange, onPropsChange, onDelete }: ElementInspectorProps) {
  return (
    <div className="space-y-4 text-xs">
      <div className="rounded-2xl border border-slate-200 p-3">
        <label className="mb-2 block font-semibold text-slate-700">Název komponenty</label>

        <input
          value={element.label}
          onChange={(event) => onElementChange({ label: event.target.value })}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-900"
        />
      </div>

      <GeometryFields element={element} onChange={onElementChange} />

      <DensityControl
        value={element.props.density}
        onChange={(density: Density) => onPropsChange({ density })}
      />

      <DataBindingField props={element.props} onChange={onPropsChange} />
      <MetadataPanel />

      <Button variant="danger" className="w-full justify-center" onClick={onDelete}>
        Smazat komponentu
      </Button>
    </div>
  );
}
