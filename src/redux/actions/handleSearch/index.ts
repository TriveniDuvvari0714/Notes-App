import { SET_SEARCH_TEXT } from "./types";

export function setSearchText(text: string): Action {
  return {
    type: SET_SEARCH_TEXT,
    payload: text,
  };
}
