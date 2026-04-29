import type { PaletteGroup } from "./palette.types";

export const PALETTE_GROUPS: PaletteGroup[] = [
  {
    name: "Layout",
    icon: "grid",
    items: [
      { type: "card", label: "Panel / Card", w: 260, h: 150 },
      { type: "splitter", label: "Splitter", w: 360, h: 220 },
      { type: "collapsible", label: "Collapsible sekce", w: 300, h: 120 },
      { type: "stickyHeader", label: "Sticky header", w: 520, h: 64 },
    ],
  },
  {
    name: "Tabulky a dlouhé seznamy",
    icon: "table",
    items: [
      { type: "dataGrid", label: "ERP Data Grid", w: 720, h: 360 },
      { type: "treeGrid", label: "Tree Grid", w: 520, h: 260 },
      { type: "pivot", label: "Pivot tabulka", w: 520, h: 260 },
      { type: "virtualList", label: "Virtuální seznam", w: 320, h: 420 },
      { type: "masterDetail", label: "Master-detail grid", w: 680, h: 340 },
    ],
  },
  {
    name: "Filtrace a hledání",
    icon: "filter",
    items: [
      { type: "quickFilters", label: "Quick filter bar", w: 620, h: 92 },
      { type: "advancedFilter", label: "Advanced filter builder", w: 560, h: 190 },
      { type: "searchBar", label: "Globální vyhledávání", w: 460, h: 62 },
      { type: "filterChips", label: "Filter chips", w: 520, h: 72 },
    ],
  },
  {
    name: "ERP komponenty",
    icon: "workflow",
    items: [
      { type: "documentFlow", label: "Document flow", w: 620, h: 180 },
      { type: "approval", label: "Approval workflow", w: 420, h: 260 },
      { type: "auditTrail", label: "Audit trail", w: 420, h: 300 },
      { type: "periodSelector", label: "Period selector", w: 360, h: 72 },
      { type: "journalGrid", label: "Journal entry grid", w: 680, h: 320 },
      { type: "kanban", label: "Kanban board", w: 680, h: 360 },
    ],
  },
  {
    name: "Formuláře a akce",
    icon: "settings",
    items: [
      { type: "formPanel", label: "Detail/edit formulář", w: 460, h: 430 },
      { type: "toolbar", label: "Toolbar", w: 680, h: 64 },
      { type: "bulkActions", label: "Bulk actions bar", w: 560, h: 72 },
      { type: "importExport", label: "Import / Export", w: 360, h: 160 },
    ],
  },
  {
    name: "Dashboard",
    icon: "dashboard",
    items: [
      { type: "kpiCards", label: "KPI cards", w: 660, h: 160 },
      { type: "statusBoard", label: "Status indicators", w: 440, h: 220 },
      { type: "miniChart", label: "Mini charts", w: 360, h: 220 },
    ],
  },
];
