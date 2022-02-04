import { SET_NEW_NOTE_TITLE, SET_NEW_NOTE_TEXT, SET_NOTE_PREVIEW_ID } from "./types";

export function setNewTitle(name: string): Action {
  return {
    type: SET_NEW_NOTE_TITLE,
    payload: name,
  };
}

export function setNewNoteText(text: string): Action {
  return {
    type: SET_NEW_NOTE_TEXT,
    payload: text,
  };
}

export function setNotePreviewId(id: number): Action {
  return {
    type: SET_NOTE_PREVIEW_ID,
    payload: id,
  };
}
