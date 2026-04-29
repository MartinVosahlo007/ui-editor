import type { PaletteGroup as PaletteGroupModel, PaletteItem } from "../../domain/palette/palette.types";
import type { TemplateDefinition, TemplateKey } from "../../domain/templates/template.types";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import { PaletteGroup } from "./PaletteGroup";

interface PalettePanelProps {
  groups: PaletteGroupModel[];
  templates: TemplateDefinition[];
  onAddItem: (item: PaletteItem) => void;
  onApplyTemplate: (templateKey: TemplateKey) => void;
}

export function PalettePanel({ groups, templates, onAddItem, onApplyTemplate }: PalettePanelProps) {
  return (
    <aside className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold">
          <Icon name="panel" size={16} />
          Component palette
        </div>

        <div className="grid grid-cols-3 gap-2">
          {templates.map((template) => (
            <Button key={template.key} onClick={() => onApplyTemplate(template.key)}>
              <Icon name={template.icon} size={13} />
              {template.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-3">
        {groups.map((group) => (
          <PaletteGroup key={group.name} group={group} onAdd={onAddItem} />
        ))}
      </div>
    </aside>
  );
}
