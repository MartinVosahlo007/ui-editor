import { useRef, type ChangeEvent } from "react";
import { Button } from "../shared/Button";
import { Icon } from "../shared/Icon";
import { StatusMessage, type StatusMessageValue } from "../shared/StatusMessage";

interface HeaderBarProps {
  canUndo: boolean;
  canRedo: boolean;
  showGrid: boolean;
  preview: boolean;
  lastSavedAt: string | null;
  statusMessage: StatusMessageValue | null;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  onToggleGrid: () => void;
  onTogglePreview: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => Promise<void>;
  onSave: () => void;
  onReset: () => void;
}

function formatSavedAt(lastSavedAt: string | null): string {
  if (!lastSavedAt) return "";

  return new Intl.DateTimeFormat("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(lastSavedAt));
}

export function HeaderBar({
  canUndo,
  canRedo,
  showGrid,
  preview,
  lastSavedAt,
  statusMessage,
  onUndo,
  onRedo,
  onDuplicate,
  onToggleGrid,
  onTogglePreview,
  onExportJson,
  onImportJson,
  onSave,
  onReset,
}: HeaderBarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void onImportJson(file);
    event.target.value = "";
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white">
          <Icon name="file" size={18} />
        </div>

        <div>
          <div className="font-bold leading-tight">ERP Wireframe Editor</div>
          <div className="text-xs text-slate-500">vysoká informační hustota • tabulky • workflow • audit • import/export</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StatusMessage message={statusMessage} />

        {lastSavedAt && <span className="mr-1 text-[11px] text-slate-400">Uloženo {formatSavedAt(lastSavedAt)}</span>}

        <Button onClick={onUndo} title="Undo" disabled={!canUndo}>
          <Icon name="undo" size={14} />
          Undo
        </Button>

        <Button onClick={onRedo} title="Redo" disabled={!canRedo}>
          <Icon name="redo" size={14} />
          Redo
        </Button>

        <Button onClick={onDuplicate} title="Duplicate">
          <Icon name="plus" size={14} />
          Duplicate
        </Button>

        <Button active={showGrid} onClick={onToggleGrid}>
          <Icon name="grid" size={14} />
          Grid
        </Button>

        <Button active={preview} onClick={onTogglePreview}>
          <Icon name="eye" size={14} />
          Preview
        </Button>

        <Button onClick={onExportJson}>
          <Icon name="download" size={14} />
          Export JSON
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImportFile}
          className="hidden"
        />

        <Button onClick={() => fileInputRef.current?.click()}>
          <Icon name="upload" size={14} />
          Import
        </Button>

        <Button onClick={onSave}>
          <Icon name="save" size={14} />
          Save
        </Button>

        <Button onClick={onReset} variant="danger">
          Reset
        </Button>
      </div>
    </header>
  );
}
