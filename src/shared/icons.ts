export const iconPaths = {
  align: "M4 7h16M7 4v6M17 4v6M4 17h16M10 14v6M14 14v6",
  boxes:
    "M7 8l5-3 5 3-5 3-5-3z M7 8v6l5 3 5-3V8 M3 14l4-2 5 3-5 3-4-2v-2z M17 12l4 2v2l-4 2-5-3 5-3z",
  chevronDown: "M6 9l6 6 6-6",
  database:
    "M4 6c0-2 4-3 8-3s8 1 8 3-4 3-8 3-8-1-8-3z M4 6v6c0 2 4 3 8 3s8-1 8-3V6 M4 12v6c0 2 4 3 8 3s8-1 8-3v-6",
  download: "M12 3v11 M7 10l5 5 5-5 M5 21h14",
  eye:
    "M2 12s4-7 10-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 100 6 3 3 0 000-6z",
  file: "M6 3h8l4 4v14H6V3z M14 3v5h5 M8 13h8 M8 17h8 M8 9h3",
  filter: "M3 5h18l-7 8v5l-4 2v-7L3 5z",
  git:
    "M6 3a3 3 0 110 6 3 3 0 010-6z M18 15a3 3 0 110 6 3 3 0 010-6z M6 9v3a6 6 0 006 6h3 M18 3v12 M15 6l3-3 3 3",
  grid:
    "M4 4h6v6H4V4z M14 4h6v6h-6V4z M4 14h6v6H4v-6z M14 14h6v6h-6v-6z",
  history: "M3 12a9 9 0 109-9 M3 4v6h6 M12 7v6l4 2",
  dashboard: "M4 13h7V4H4v9z M13 20h7V4h-7v16z M4 20h7v-5H4v5z",
  layers: "M12 3l9 5-9 5-9-5 9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  maximize: "M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5",
  mouse: "M5 3l14 8-6 2 3 6-3 1-3-6-5 5V3z",
  panel: "M3 5h18v14H3V5z M9 5v14",
  plus: "M12 5v14 M5 12h14",
  undo: "M9 7H4v5 M4 12a8 8 0 101.7-5",
  redo: "M15 7h5v5 M20 12a8 8 0 10-1.7-5",
  save: "M5 3h12l2 2v16H5V3z M8 3v6h8 M8 21v-7h8v7",
  search: "M10 18a8 8 0 100-16 8 8 0 000 16z M21 21l-5-5",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.8 1.8 0 00.4 2l.1.1-2 3.4-.2-.1a1.8 1.8 0 00-2 .4l-.5.3a1.8 1.8 0 00-.9 1.7V23H9.7v-.2a1.8 1.8 0 00-.9-1.7l-.5-.3a1.8 1.8 0 00-2-.4l-.2.1-2-3.4.1-.1a1.8 1.8 0 00.4-2v-.6a1.8 1.8 0 00-1.4-1.3H3V9h.2a1.8 1.8 0 001.4-1.3V7a1.8 1.8 0 00-.4-2L4.1 5l2-3.4.2.1a1.8 1.8 0 002-.4l.5-.3A1.8 1.8 0 009.7-.7V-1h4.6v.3a1.8 1.8 0 00.9 1.7l.5.3a1.8 1.8 0 002 .4l.2-.1 2 3.4-.1.1a1.8 1.8 0 00-.4 2v.6A1.8 1.8 0 0020.8 9h.2v4h-.2a1.8 1.8 0 00-1.4 1.3v.7z",
  sliders: "M4 7h10 M18 7h2 M16 5v4 M4 17h2 M10 17h10 M8 15v4 M4 12h4 M12 12h8 M10 10v4",
  table: "M3 5h18v14H3V5z M3 10h18 M3 15h18 M9 5v14 M15 5v14",
  upload: "M12 21V10 M7 15l5-5 5 5 M5 3h14",
  workflow: "M4 6h6v6H4V6z M14 12h6v6h-6v-6z M10 9h3a4 4 0 014 4 M14 15h-3a4 4 0 01-4-4",
  zap: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
} as const;

export type IconName = keyof typeof iconPaths;

export function isIconName(name: string): name is IconName {
  return Object.hasOwn(iconPaths, name);
}
