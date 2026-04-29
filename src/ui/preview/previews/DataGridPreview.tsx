import { densityClasses } from "../../../domain/canvas/canvas.helpers";
import type { Density } from "../../../domain/canvas/canvas.types";
import { classNames } from "../../../shared/classNames";
import { Icon } from "../../shared/Icon";
import { StatusBadge } from "../../shared/StatusBadge";
import { GRID_HEADERS, GRID_ROWS } from "../previewData";

interface DataGridPreviewProps {
  density?: Density;
}

export function DataGridPreview({ density = "compact" }: DataGridPreviewProps) {
  return (
    <div className={classNames("h-full overflow-hidden rounded-xl border border-slate-200", densityClasses(density))}>
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <Icon name="table" size={14} />
          Zakázky
          <span className="text-slate-400">10 482 řádků</span>
        </div>

        <div className="flex gap-1 text-[10px] text-slate-500">
          <span>Frozen: ID, Zákazník</span>
          <span>•</span>
          <span>Virtual scroll</span>
        </div>
      </div>

      <table className="w-full table-fixed border-collapse">
        <thead className="sticky top-0 bg-white text-left text-[10px] uppercase text-slate-500">
          <tr>
            {GRID_HEADERS.map((header) => (
              <th key={header} className="border-b border-r border-slate-200 px-2 py-1.5 font-semibold">
                <div className="flex items-center justify-between gap-1">
                  {header}
                  <Icon name="chevronDown" size={12} />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {GRID_ROWS.map((row, rowIndex) => (
            <tr key={row[0]} className={rowIndex % 2 ? "bg-slate-50/60" : "bg-white"}>
              {row.map((cell, columnIndex) => (
                <td key={`${row[0]}-${cell}`} className="truncate border-b border-r border-slate-100 px-2 py-1.5 text-slate-700">
                  {columnIndex === 4 ? <StatusBadge value={cell} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between bg-white px-2 py-1 text-[10px] text-slate-500">
        <span>Vybráno 3 záznamů • Group by: Zákazník</span>
        <span>1–50 / 10 482</span>
      </div>
    </div>
  );
}
