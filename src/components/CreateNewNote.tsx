import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  addNewNote,
  setEditStatus,
  updateNote,
} from "../redux/actions/handleNoteList";
import {
  setNewTitle,
  setNewNoteText,
} from "./../redux/actions/handleNoteFields";

const CreateNewNote: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notesList = useSelector((state: AppState) => state.notesList);
  const { title, noteText } = useSelector(
    (state: AppState) => state.noteFields
  );

  const isEdit = useSelector((state: AppState) => state.isEdit);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isEdit) {
      const note = notesList.find(
        (n) => n.id === +history.location.pathname.split("/")[2]
      );
      const updatedNote = {
        ...note,
        title,
        noteText,
      };
      dispatch(updateNote(updatedNote));
    } else {
      dispatch(addNewNote({ title, noteText }));
    }
    history.push("/");
  };

  const handleFormCancel = () => {
    dispatch(setNewNoteText(""));
    dispatch(setNewTitle(""));
    dispatch(setEditStatus(false));
  };

  return (
    <form
      className="card m-5 p-5 d-flex flex-column align-items-center"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <div className="w-50">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              #
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Note's title"
            value={title}
            onChange={(e) => dispatch(setNewTitle(e.target.value))}
            required
            minLength={3}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="noteTextarea"
            rows={3}
            value={noteText}
            onChange={(e) => dispatch(setNewNoteText(e.target.value))}
            placeholder="Your text here"
            required
          />
        </div>
      </div>
      <div className="w-50">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <Link
          to="/"
          className="btn btn-light ml-2"
          type="reset"
          onClick={handleFormCancel}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default CreateNewNote;
