import { UPDATE_NOTE } from "./../actions/handleNoteList/types";
import {
  ADD_NEW_NOTE,
  DELETE_NOTE,
  FETCH_NOTES,
  IS_EDIT,
} from "../actions/handleNoteList/types";

import {
  SET_NEW_NOTE_TITLE,
  SET_NOTE_PREVIEW_ID,
  SET_NEW_NOTE_TEXT,
} from "../actions/handleNoteFields/types";

import { SET_SEARCH_TEXT } from "../actions/handleSearch/types";

const initialState: AppState = {
  notesList: [],
  noteFields: {
    title: "",
    noteText: "",
  },
  notePreviewId: null,
  searchText: "",
  isEdit: false,
};

function updateNoteFields(
  state: AppState,
  payload: Action["payload"],
  fieldName: string
) {
  return {
    ...state,
    noteFields: {
      ...state.noteFields,
      [fieldName]: payload,
    },
  };
}

const resetNoteFields = () => ({ title: "", noteText: "" });

export const reducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case SET_NEW_NOTE_TITLE:
      return updateNoteFields(state, action.payload, "title");
    case SET_NEW_NOTE_TEXT:
      return updateNoteFields(state, action.payload, "noteText");
    case ADD_NEW_NOTE:
      const { title, noteText } = action.payload;

      if (state.isEdit) {
        return {
          ...state,
          isEdit: false,
        };
      } else {
        const newNote: Note = {
          title,
          noteText,
          id: Date.now(),
          date: new Date(),
        };
        return {
          ...state,
          notesList: [newNote, ...state.notesList],
          noteFields: resetNoteFields(),
        };
      }
    case SET_NOTE_PREVIEW_ID:
      return {
        ...state,
        notePreviewId: action.payload,
      };
    case FETCH_NOTES:
      return {
        ...state,
        notesList: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notePreviewId: null,
        notesList: state.notesList.filter(({ id }) => id !== action.payload),
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        notePreviewId: null,
        searchText: action.payload,
      };
    case UPDATE_NOTE:
      const note = state.notesList.find((n) => n.id === action.payload.id);
      const updatedNote = {
        ...note,
        title: action.payload.title,
        noteText: action.payload.noteText,
        date: new Date(),
      };
      const noteIndex = state.notesList.findIndex(
        (n) => n.id === action.payload.id
      );
      const updatedNotesList = [
        ...state.notesList.slice(0, noteIndex),
        updatedNote,
        ...state.notesList.slice(noteIndex + 1),
      ];
      return {
        ...state,
        notesList: updatedNotesList,
        noteFields: resetNoteFields(),
        isEdit: false,
      };
    case IS_EDIT:
      return {
        ...state,
        isEdit: action.payload,
      };
    default:
      return state;
  }
};
