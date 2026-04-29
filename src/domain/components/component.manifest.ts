import type { CanvasElementProps } from "../canvas/canvas.types";
import type { IconName } from "../../shared/icons";
import type { ComponentKind } from "./component.types";

interface ComponentDefinition<TProps = CanvasElementProps> {
  type: ComponentKind;
  label: string;
  category: string;
  icon?: IconName;
  defaultSize: { w: number; h: number };
  defaultProps?: Partial<TProps>;
  previewKey: ComponentKind;
}

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  { type: "card", label: "Panel / Card", category: "Layout", icon: "panel", defaultSize: { w: 260, h: 150 }, previewKey: "card" },
  { type: "splitter", label: "Splitter", category: "Layout", icon: "grid", defaultSize: { w: 360, h: 220 }, previewKey: "splitter" },
  { type: "collapsible", label: "Collapsible sekce", category: "Layout", icon: "chevronDown", defaultSize: { w: 300, h: 120 }, previewKey: "collapsible" },
  { type: "stickyHeader", label: "Sticky header", category: "Layout", icon: "layers", defaultSize: { w: 520, h: 64 }, previewKey: "stickyHeader" },
  { type: "dataGrid", label: "ERP Data Grid", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 720, h: 360 }, previewKey: "dataGrid" },
  { type: "treeGrid", label: "Tree Grid", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 520, h: 260 }, previewKey: "treeGrid" },
  { type: "pivot", label: "Pivot tabulka", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 520, h: 260 }, previewKey: "dataGrid" },
  { type: "virtualList", label: "Virtuální seznam", category: "Tabulky a dlouhé seznamy", icon: "list", defaultSize: { w: 320, h: 420 }, previewKey: "virtualList" },
  { type: "masterDetail", label: "Master-detail grid", category: "Tabulky a dlouhé seznamy", icon: "panel", defaultSize: { w: 680, h: 340 }, previewKey: "masterDetail" },
  { type: "quickFilters", label: "Quick filter bar", category: "Filtrace a hledání", icon: "filter", defaultSize: { w: 620, h: 92 }, previewKey: "quickFilters" },
  { type: "advancedFilter", label: "Advanced filter builder", category: "Filtrace a hledání", icon: "sliders", defaultSize: { w: 560, h: 190 }, previewKey: "advancedFilter" },
  { type: "searchBar", label: "Globální vyhledávání", category: "Filtrace a hledání", icon: "search", defaultSize: { w: 460, h: 62 }, previewKey: "searchBar" },
  { type: "filterChips", label: "Filter chips", category: "Filtrace a hledání", icon: "filter", defaultSize: { w: 520, h: 72 }, previewKey: "quickFilters" },
  { type: "documentFlow", label: "Document flow", category: "ERP komponenty", icon: "workflow", defaultSize: { w: 620, h: 180 }, previewKey: "documentFlow" },
  { type: "approval", label: "Approval workflow", category: "ERP komponenty", icon: "workflow", defaultSize: { w: 420, h: 260 }, previewKey: "approval" },
  { type: "auditTrail", label: "Audit trail", category: "ERP komponenty", icon: "history", defaultSize: { w: 420, h: 300 }, previewKey: "auditTrail" },
  { type: "periodSelector", label: "Period selector", category: "ERP komponenty", icon: "history", defaultSize: { w: 360, h: 72 }, previewKey: "periodSelector" },
  { type: "journalGrid", label: "Journal entry grid", category: "ERP komponenty", icon: "table", defaultSize: { w: 680, h: 320 }, previewKey: "dataGrid" },
  { type: "kanban", label: "Kanban board", category: "ERP komponenty", icon: "dashboard", defaultSize: { w: 680, h: 360 }, previewKey: "kanban" },
  { type: "formPanel", label: "Detail/edit formulář", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 460, h: 430 }, previewKey: "formPanel" },
  { type: "toolbar", label: "Toolbar", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 680, h: 64 }, previewKey: "toolbar" },
  { type: "bulkActions", label: "Bulk actions bar", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 560, h: 72 }, previewKey: "toolbar" },
  { type: "importExport", label: "Import / Export", category: "Formuláře a akce", icon: "download", defaultSize: { w: 360, h: 160 }, previewKey: "importExport" },
  { type: "kpiCards", label: "KPI cards", category: "Dashboard", icon: "dashboard", defaultSize: { w: 660, h: 160 }, previewKey: "kpiCards" },
  { type: "statusBoard", label: "Status indicators", category: "Dashboard", icon: "dashboard", defaultSize: { w: 440, h: 220 }, previewKey: "statusBoard" },
  { type: "miniChart", label: "Mini charts", category: "Dashboard", icon: "dashboard", defaultSize: { w: 360, h: 220 }, previewKey: "miniChart" },
  { type: "relatedDocs", label: "Related documents", category: "ERP komponenty", icon: "git", defaultSize: { w: 420, h: 180 }, previewKey: "relatedDocs" },
];

export const COMPONENT_KINDS = COMPONENT_DEFINITIONS.map((definition) => definition.type);
