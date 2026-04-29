export function migrateEditorDocument(input: unknown): unknown {
  if (!input || typeof input !== "object") return input;

  const record = input as Record<string, unknown>;

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
