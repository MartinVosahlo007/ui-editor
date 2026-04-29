import {
  DEFAULT_ZOOM,
  MAX_HISTORY_ITEMS,
} from "./canvas.constants";
import type {
  CanvasElement,
  CanvasElementId,
  EditorAction,
  EditorSnapshot,
  EditorState,
} from "./canvas.types";

function snapshotOf(state: EditorState): EditorSnapshot {
  return {
    elements: state.elements,
    selectedId: state.selectedId,
  };
}

function withHistory(state: EditorState): EditorState {
  return {
    ...state,
    history: {
      past: [...state.history.past.slice(-(MAX_HISTORY_ITEMS - 1)), snapshotOf(state)],
      future: [],
    },
  };
}

function updateSelectionAfterDelete(
  currentSelectedId: CanvasElementId | null,
  deletedId: CanvasElementId
): CanvasElementId | null {
  return currentSelectedId === deletedId ? null : currentSelectedId;
}

export function createInitialEditorState(
  elements: CanvasElement[],
  selectedId: CanvasElementId | null = null
): EditorState {
  return {
    elements,
    selectedId,
    zoom: DEFAULT_ZOOM,
    showGrid: true,
    preview: false,
    lastSavedAt: null,
    history: {
      past: [],
      future: [],
    },
  };
}

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_ELEMENT": {
      const next = withHistory(state);
      return {
        ...next,
        elements: [...state.elements, action.element],
        selectedId: action.element.id,
      };
    }

    case "APPLY_TEMPLATE": {
      const next = withHistory(state);
      return {
        ...next,
        elements: action.elements,
        selectedId: null,
      };
    }

    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedId: action.id,
      };

    case "UPDATE_ELEMENT": {
      const base = action.trackHistory === false ? state : withHistory(state);

      return {
        ...base,
        elements: state.elements.map((element) =>
          element.id === action.id ? { ...element, ...action.patch } : element
        ),
      };
    }

    case "UPDATE_ELEMENT_PROPS": {
      const base = action.trackHistory === false ? state : withHistory(state);

      return {
        ...base,
        elements: state.elements.map((element) =>
          element.id === action.id
            ? {
                ...element,
                props: {
                  ...element.props,
                  ...action.patch,
                },
              }
            : element
        ),
      };
    }

    case "DELETE_ELEMENT": {
      const next = withHistory(state);

      return {
        ...next,
        elements: state.elements.filter((element) => element.id !== action.id),
        selectedId: updateSelectionAfterDelete(state.selectedId, action.id),
      };
    }

    case "CAPTURE_HISTORY":
      return withHistory(state);

    case "UNDO": {
      const previous = state.history.past.at(-1);
      if (!previous) return state;

      return {
        ...state,
        ...previous,
        history: {
          past: state.history.past.slice(0, -1),
          future: [snapshotOf(state), ...state.history.future].slice(0, MAX_HISTORY_ITEMS),
        },
      };
    }

    case "REDO": {
      const next = state.history.future[0];
      if (!next) return state;

      return {
        ...state,
        ...next,
        history: {
          past: [...state.history.past, snapshotOf(state)].slice(-MAX_HISTORY_ITEMS),
          future: state.history.future.slice(1),
        },
      };
    }

    case "SET_ZOOM":
      return {
        ...state,
        zoom: action.zoom,
      };

    case "TOGGLE_GRID":
      return {
        ...state,
        showGrid: !state.showGrid,
      };

    case "TOGGLE_PREVIEW":
      return {
        ...state,
        preview: !state.preview,
        selectedId: state.preview ? state.selectedId : null,
      };

    case "MARK_SAVED":
      return {
        ...state,
        lastSavedAt: action.savedAt,
      };

    case "LOAD_DOCUMENT":
      return {
        ...state,
        elements: action.elements,
        selectedId: action.selectedId ?? null,
        history: {
          past: [],
          future: [],
        },
      };

    case "RESET":
      return createInitialEditorState(action.elements);

    default:
      return state;
  }
}
