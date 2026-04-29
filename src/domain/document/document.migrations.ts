import { z } from "zod";

const objectRecordSchema = z.record(z.string(), z.unknown());

export function migrateEditorDocument(input: unknown): unknown {
  const result = objectRecordSchema.safeParse(input);
  if (!result.success) return input;

  const record = result.data;

  if (record.version === 1) {
    return {
      ...record,
      name: typeof record.name === "string" && record.name.trim() ? record.name : "ERP Wireframe",
      savedAt:
        typeof record.savedAt === "string" || record.savedAt === null
          ? record.savedAt
          : typeof record.exportedAt === "string"
            ? record.exportedAt
            : null,
    };
  }

  return input;
}
