import type { ComponentType } from "react";
import type { CanvasElement } from "../../domain/canvas/canvas.types";
import type { ComponentKind } from "../../domain/components/component.types";
import { AdvancedFilterPreview } from "./previews/AdvancedFilterPreview";
import { ApprovalPreview } from "./previews/ApprovalPreview";
import { AuditTrailPreview } from "./previews/AuditTrailPreview";
import { DataGridPreview } from "./previews/DataGridPreview";
import { DocumentFlowPreview } from "./previews/DocumentFlowPreview";
import { FormPanelPreview } from "./previews/FormPanelPreview";
import { GenericFallbackPreview } from "./previews/GenericFallbackPreview";
import { ImportExportPreview } from "./previews/ImportExportPreview";
import { KanbanPreview } from "./previews/KanbanPreview";
import { KpiCardsPreview } from "./previews/KpiCardsPreview";
import { MasterDetailPreview } from "./previews/MasterDetailPreview";
import { PeriodSelectorPreview } from "./previews/PeriodSelectorPreview";
import { QuickFiltersPreview } from "./previews/QuickFiltersPreview";
import { SearchBarPreview } from "./previews/SearchBarPreview";
import { SplitterPreview } from "./previews/SplitterPreview";
import { StatusChartPreview } from "./previews/StatusChartPreview";
import { ToolbarPreview } from "./previews/ToolbarPreview";
import { TreeGridPreview } from "./previews/TreeGridPreview";
import { VirtualListPreview } from "./previews/VirtualListPreview";

interface PreviewComponentProps {
  element: CanvasElement;
}

type PreviewComponent = ComponentType<PreviewComponentProps>;

function noProps(Component: ComponentType): PreviewComponent {
  return function PreviewAdapter(_props: PreviewComponentProps) {
    return <Component />;
  };
}

const DataGridPreviewAdapter = ({ element }: PreviewComponentProps) => (
  <DataGridPreview density={element.props.density} />
);

const StatusChartPreviewAdapter = ({ element }: PreviewComponentProps) => (
  <StatusChartPreview label={element.label || element.type} />
);

export const componentPreviewRegistry: Partial<Record<ComponentKind, PreviewComponent>> = {
  dataGrid: DataGridPreviewAdapter,
  journalGrid: DataGridPreviewAdapter,
  pivot: DataGridPreviewAdapter,
  treeGrid: noProps(TreeGridPreview),
  quickFilters: noProps(QuickFiltersPreview),
  filterChips: noProps(QuickFiltersPreview),
  advancedFilter: noProps(AdvancedFilterPreview),
  searchBar: noProps(SearchBarPreview),
  documentFlow: noProps(DocumentFlowPreview),
  approval: noProps(ApprovalPreview),
  auditTrail: noProps(AuditTrailPreview),
  formPanel: noProps(FormPanelPreview),
  toolbar: noProps(ToolbarPreview),
  bulkActions: noProps(ToolbarPreview),
  kpiCards: noProps(KpiCardsPreview),
  kanban: noProps(KanbanPreview),
  periodSelector: noProps(PeriodSelectorPreview),
  virtualList: noProps(VirtualListPreview),
  masterDetail: noProps(MasterDetailPreview),
  splitter: noProps(SplitterPreview),
  importExport: noProps(ImportExportPreview),
  statusBoard: StatusChartPreviewAdapter,
  miniChart: StatusChartPreviewAdapter,
};

export function resolvePreviewComponent(element: CanvasElement): PreviewComponent {
  return (
    componentPreviewRegistry[element.type] ??
    (({ element: fallbackElement }) => (
      <GenericFallbackPreview label={fallbackElement.label || fallbackElement.type} />
    ))
  );
}
