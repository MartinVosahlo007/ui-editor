import type { TemplateDefinition, TemplateElementDefinition, TemplateKey } from "./template.types";

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  { key: "erpList", label: "List", icon: "table" },
  { key: "documentFlow", label: "Flow", icon: "git" },
  { key: "dashboard", label: "Dash", icon: "dashboard" },
];

export const TEMPLATE_ELEMENTS: Record<TemplateKey, TemplateElementDefinition[]> = {
  erpList: [
    { type: "toolbar", label: "Zakázky – toolbar", x: 40, y: 32, w: 780, h: 64 },
    { type: "quickFilters", label: "Rychlé filtry zakázek", x: 40, y: 112, w: 780, h: 92 },
    { type: "dataGrid", label: "Zakázky – hustá tabulka", x: 40, y: 222, w: 780, h: 390 },
    { type: "auditTrail", label: "Audit trail záznamu", x: 840, y: 112, w: 360, h: 500 },
  ],
  documentFlow: [
    { type: "periodSelector", label: "Období a firma", x: 40, y: 30, w: 460, h: 72 },
    { type: "documentFlow", label: "Tok dokladů", x: 40, y: 122, w: 760, h: 190 },
    { type: "masterDetail", label: "Doklady a položky", x: 40, y: 336, w: 760, h: 340 },
    { type: "approval", label: "Schvalování", x: 830, y: 122, w: 360, h: 250 },
    { type: "relatedDocs", label: "Související doklady", x: 830, y: 396, w: 360, h: 280 },
  ],
  dashboard: [
    { type: "searchBar", label: "Command palette / globální hledání", x: 40, y: 34, w: 700, h: 62 },
    { type: "kpiCards", label: "KPI přehled", x: 40, y: 118, w: 760, h: 160 },
    { type: "statusBoard", label: "Stavy integrací", x: 824, y: 118, w: 360, h: 220 },
    { type: "miniChart", label: "Trendy", x: 40, y: 304, w: 360, h: 240 },
    { type: "kanban", label: "Procesní board", x: 426, y: 304, w: 760, h: 360 },
  ],
};
