import { createElement, type ComponentType } from "react";
import type { CanvasElement } from "../../domain/canvas/canvas.types";
import type { ComponentKind } from "../../domain/components/component.types";
import { AdvancedFilterPreview } from "./previews/AdvancedFilterPreview";
import { ApprovalPreview } from "./previews/ApprovalPreview";
import { AuditTrailPreview } from "./previews/AuditTrailPreview";
import { CardPreview } from "./previews/CardPreview";
import { CollapsiblePreview } from "./previews/CollapsiblePreview";
import { DataGridPreview } from "./previews/DataGridPreview";
import { DocumentFlowPreview } from "./previews/DocumentFlowPreview";
import { FormPanelPreview } from "./previews/FormPanelPreview";
import { ImportExportPreview } from "./previews/ImportExportPreview";
import { KanbanPreview } from "./previews/KanbanPreview";
import { KpiCardsPreview } from "./previews/KpiCardsPreview";
import { MasterDetailPreview } from "./previews/MasterDetailPreview";
import { PeriodSelectorPreview } from "./previews/PeriodSelectorPreview";
import { QuickFiltersPreview } from "./previews/QuickFiltersPreview";
import { RelatedDocsPreview } from "./previews/RelatedDocsPreview";
import { SearchBarPreview } from "./previews/SearchBarPreview";
import { SplitterPreview } from "./previews/SplitterPreview";
import { StatusChartPreview } from "./previews/StatusChartPreview";
import { StickyHeaderPreview } from "./previews/StickyHeaderPreview";
import { ToolbarPreview } from "./previews/ToolbarPreview";
import { TreeGridPreview } from "./previews/TreeGridPreview";
import { VirtualListPreview } from "./previews/VirtualListPreview";

export interface PreviewComponentProps {
  element: CanvasElement;
}

export type PreviewComponent = ComponentType<PreviewComponentProps>;

function noProps(Component: ComponentType): PreviewComponent {
  return function PreviewAdapter() {
    return createElement(Component);
  };
}

const DataGridPreviewAdapter = ({ element }: PreviewComponentProps) =>
  createElement(DataGridPreview, { density: element.props.density });

const StatusChartPreviewAdapter = ({ element }: PreviewComponentProps) =>
  createElement(StatusChartPreview, { label: element.label || element.type });

export const PREVIEW_COMPONENTS: Record<ComponentKind, PreviewComponent> = {
  card: noProps(CardPreview),
  splitter: noProps(SplitterPreview),
  collapsible: noProps(CollapsiblePreview),
  stickyHeader: noProps(StickyHeaderPreview),
  dataGrid: DataGridPreviewAdapter,
  treeGrid: noProps(TreeGridPreview),
  pivot: DataGridPreviewAdapter,
  virtualList: noProps(VirtualListPreview),
  masterDetail: noProps(MasterDetailPreview),
  quickFilters: noProps(QuickFiltersPreview),
  advancedFilter: noProps(AdvancedFilterPreview),
  searchBar: noProps(SearchBarPreview),
  filterChips: noProps(QuickFiltersPreview),
  documentFlow: noProps(DocumentFlowPreview),
  approval: noProps(ApprovalPreview),
  auditTrail: noProps(AuditTrailPreview),
  periodSelector: noProps(PeriodSelectorPreview),
  journalGrid: DataGridPreviewAdapter,
  kanban: noProps(KanbanPreview),
  formPanel: noProps(FormPanelPreview),
  toolbar: noProps(ToolbarPreview),
  bulkActions: noProps(ToolbarPreview),
  importExport: noProps(ImportExportPreview),
  kpiCards: noProps(KpiCardsPreview),
  statusBoard: StatusChartPreviewAdapter,
  miniChart: StatusChartPreviewAdapter,
  relatedDocs: noProps(RelatedDocsPreview),
};
