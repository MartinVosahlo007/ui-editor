import { createElement, type ComponentType } from "react";
import type { CanvasElement, CanvasElementProps } from "../canvas/canvas.types";
import type { IconName } from "../../ui/shared/icons";
import type { ComponentKind } from "./component.types";
import { AdvancedFilterPreview } from "../../ui/preview/previews/AdvancedFilterPreview";
import { ApprovalPreview } from "../../ui/preview/previews/ApprovalPreview";
import { AuditTrailPreview } from "../../ui/preview/previews/AuditTrailPreview";
import { CardPreview } from "../../ui/preview/previews/CardPreview";
import { CollapsiblePreview } from "../../ui/preview/previews/CollapsiblePreview";
import { DataGridPreview } from "../../ui/preview/previews/DataGridPreview";
import { DocumentFlowPreview } from "../../ui/preview/previews/DocumentFlowPreview";
import { FormPanelPreview } from "../../ui/preview/previews/FormPanelPreview";
import { ImportExportPreview } from "../../ui/preview/previews/ImportExportPreview";
import { KanbanPreview } from "../../ui/preview/previews/KanbanPreview";
import { KpiCardsPreview } from "../../ui/preview/previews/KpiCardsPreview";
import { MasterDetailPreview } from "../../ui/preview/previews/MasterDetailPreview";
import { PeriodSelectorPreview } from "../../ui/preview/previews/PeriodSelectorPreview";
import { QuickFiltersPreview } from "../../ui/preview/previews/QuickFiltersPreview";
import { RelatedDocsPreview } from "../../ui/preview/previews/RelatedDocsPreview";
import { SearchBarPreview } from "../../ui/preview/previews/SearchBarPreview";
import { SplitterPreview } from "../../ui/preview/previews/SplitterPreview";
import { StatusChartPreview } from "../../ui/preview/previews/StatusChartPreview";
import { StickyHeaderPreview } from "../../ui/preview/previews/StickyHeaderPreview";
import { ToolbarPreview } from "../../ui/preview/previews/ToolbarPreview";
import { TreeGridPreview } from "../../ui/preview/previews/TreeGridPreview";
import { VirtualListPreview } from "../../ui/preview/previews/VirtualListPreview";

export interface ComponentDefinition<TProps = CanvasElementProps> {
  type: ComponentKind;
  label: string;
  category: string;
  icon?: IconName;
  defaultSize: { w: number; h: number };
  defaultProps?: Partial<TProps>;
  PreviewComponent: ComponentType<{ element: CanvasElement }>;
}

function noProps(Component: ComponentType): ComponentType<{ element: CanvasElement }> {
  return function PreviewAdapter() {
    return createElement(Component);
  };
}

const DataGridPreviewAdapter = ({ element }: { element: CanvasElement }) =>
  createElement(DataGridPreview, { density: element.props.density });

const StatusChartPreviewAdapter = ({ element }: { element: CanvasElement }) =>
  createElement(StatusChartPreview, { label: element.label || element.type });

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  { type: "card", label: "Panel / Card", category: "Layout", icon: "panel", defaultSize: { w: 260, h: 150 }, PreviewComponent: noProps(CardPreview) },
  { type: "splitter", label: "Splitter", category: "Layout", icon: "grid", defaultSize: { w: 360, h: 220 }, PreviewComponent: noProps(SplitterPreview) },
  { type: "collapsible", label: "Collapsible sekce", category: "Layout", icon: "chevronDown", defaultSize: { w: 300, h: 120 }, PreviewComponent: noProps(CollapsiblePreview) },
  { type: "stickyHeader", label: "Sticky header", category: "Layout", icon: "layers", defaultSize: { w: 520, h: 64 }, PreviewComponent: noProps(StickyHeaderPreview) },
  { type: "dataGrid", label: "ERP Data Grid", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 720, h: 360 }, PreviewComponent: DataGridPreviewAdapter },
  { type: "treeGrid", label: "Tree Grid", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 520, h: 260 }, PreviewComponent: noProps(TreeGridPreview) },
  { type: "pivot", label: "Pivot tabulka", category: "Tabulky a dlouhé seznamy", icon: "table", defaultSize: { w: 520, h: 260 }, PreviewComponent: DataGridPreviewAdapter },
  { type: "virtualList", label: "Virtuální seznam", category: "Tabulky a dlouhé seznamy", icon: "list", defaultSize: { w: 320, h: 420 }, PreviewComponent: noProps(VirtualListPreview) },
  { type: "masterDetail", label: "Master-detail grid", category: "Tabulky a dlouhé seznamy", icon: "panel", defaultSize: { w: 680, h: 340 }, PreviewComponent: noProps(MasterDetailPreview) },
  { type: "quickFilters", label: "Quick filter bar", category: "Filtrace a hledání", icon: "filter", defaultSize: { w: 620, h: 92 }, PreviewComponent: noProps(QuickFiltersPreview) },
  { type: "advancedFilter", label: "Advanced filter builder", category: "Filtrace a hledání", icon: "sliders", defaultSize: { w: 560, h: 190 }, PreviewComponent: noProps(AdvancedFilterPreview) },
  { type: "searchBar", label: "Globální vyhledávání", category: "Filtrace a hledání", icon: "search", defaultSize: { w: 460, h: 62 }, PreviewComponent: noProps(SearchBarPreview) },
  { type: "filterChips", label: "Filter chips", category: "Filtrace a hledání", icon: "filter", defaultSize: { w: 520, h: 72 }, PreviewComponent: noProps(QuickFiltersPreview) },
  { type: "documentFlow", label: "Document flow", category: "ERP komponenty", icon: "workflow", defaultSize: { w: 620, h: 180 }, PreviewComponent: noProps(DocumentFlowPreview) },
  { type: "approval", label: "Approval workflow", category: "ERP komponenty", icon: "workflow", defaultSize: { w: 420, h: 260 }, PreviewComponent: noProps(ApprovalPreview) },
  { type: "auditTrail", label: "Audit trail", category: "ERP komponenty", icon: "history", defaultSize: { w: 420, h: 300 }, PreviewComponent: noProps(AuditTrailPreview) },
  { type: "periodSelector", label: "Period selector", category: "ERP komponenty", icon: "history", defaultSize: { w: 360, h: 72 }, PreviewComponent: noProps(PeriodSelectorPreview) },
  { type: "journalGrid", label: "Journal entry grid", category: "ERP komponenty", icon: "table", defaultSize: { w: 680, h: 320 }, PreviewComponent: DataGridPreviewAdapter },
  { type: "kanban", label: "Kanban board", category: "ERP komponenty", icon: "dashboard", defaultSize: { w: 680, h: 360 }, PreviewComponent: noProps(KanbanPreview) },
  { type: "formPanel", label: "Detail/edit formulář", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 460, h: 430 }, PreviewComponent: noProps(FormPanelPreview) },
  { type: "toolbar", label: "Toolbar", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 680, h: 64 }, PreviewComponent: noProps(ToolbarPreview) },
  { type: "bulkActions", label: "Bulk actions bar", category: "Formuláře a akce", icon: "settings", defaultSize: { w: 560, h: 72 }, PreviewComponent: noProps(ToolbarPreview) },
  { type: "importExport", label: "Import / Export", category: "Formuláře a akce", icon: "download", defaultSize: { w: 360, h: 160 }, PreviewComponent: noProps(ImportExportPreview) },
  { type: "kpiCards", label: "KPI cards", category: "Dashboard", icon: "dashboard", defaultSize: { w: 660, h: 160 }, PreviewComponent: noProps(KpiCardsPreview) },
  { type: "statusBoard", label: "Status indicators", category: "Dashboard", icon: "dashboard", defaultSize: { w: 440, h: 220 }, PreviewComponent: StatusChartPreviewAdapter },
  { type: "miniChart", label: "Mini charts", category: "Dashboard", icon: "dashboard", defaultSize: { w: 360, h: 220 }, PreviewComponent: StatusChartPreviewAdapter },
  { type: "relatedDocs", label: "Related documents", category: "ERP komponenty", icon: "git", defaultSize: { w: 420, h: 180 }, PreviewComponent: noProps(RelatedDocsPreview) },
];

export const COMPONENT_KINDS = COMPONENT_DEFINITIONS.map((definition) => definition.type);
