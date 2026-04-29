import { z } from "zod";
import type { EditorDocument } from "./document.types";

const componentKindSchema = z.enum([
  "card",
  "splitter",
  "collapsible",
  "stickyHeader",
  "dataGrid",
  "treeGrid",
  "pivot",
  "virtualList",
  "masterDetail",
  "quickFilters",
  "advancedFilter",
  "searchBar",
  "filterChips",
  "documentFlow",
  "approval",
  "auditTrail",
  "periodSelector",
  "journalGrid",
  "kanban",
  "formPanel",
  "toolbar",
  "bulkActions",
  "importExport",
  "kpiCards",
  "statusBoard",
  "miniChart",
  "relatedDocs",
]);

const finiteNonNegativeNumber = z.number().finite().min(0);
const finitePositiveNumber = z.number().finite().positive();

const canvasElementPropsSchema = z.object({
  density: z.enum(["compact", "default", "comfortable"]),
  dataBinding: z.string(),
  sticky: z.boolean(),
  frozenColumns: z.number().finite().int().min(0),
  virtualScroll: z.boolean(),
  inlineEdit: z.boolean(),
  batchEdit: z.boolean(),
});

const canvasElementSchema = z.object({
  id: z.string().min(1),
  type: componentKindSchema,
  label: z.string(),
  x: finiteNonNegativeNumber,
  y: finiteNonNegativeNumber,
  w: finitePositiveNumber,
  h: finitePositiveNumber,
  props: canvasElementPropsSchema,
});

export const editorDocumentSchema = z
  .object({
    version: z.literal(1),
    name: z.string().min(1),
    elements: z.array(canvasElementSchema),
    selectedId: z.string().min(1).nullable(),
    savedAt: z.string().datetime().nullable(),
  })
  .superRefine((document, context) => {
    if (!document.selectedId) return;

    const selectedExists = document.elements.some((element) => element.id === document.selectedId);
    if (!selectedExists) {
      context.addIssue({
        code: "custom",
        path: ["selectedId"],
        message: "selectedId must refer to an existing element",
      });
    }
  });

export function parseEditorDocument(input: unknown): ReturnType<typeof editorDocumentSchema.safeParse> {
  return editorDocumentSchema.safeParse(input);
}
