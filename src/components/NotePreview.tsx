import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNewNoteText, setNewTitle } from "../redux/actions/handleNoteFields";
import { deleteNote, setEditStatus } from "./../redux/actions/handleNoteList";

const NotePreview: React.FC = () => {
  const dispatch = useDispatch();
  const { notesList, notePreviewId } = useSelector((state: AppState) => state);
  const notePreview = notesList.filter(({ id }) => id === notePreviewId)[0];

  if (notesList.length === 0) {
    return (
      <div>
        <p className="text-muted mt-5">You have no notes yet!</p>
      </div>
    )
  }

  if (!notePreview) {
    return (
      <div>
        <p className="text-muted">Click to note to preview it.</p>
      </div>
    );
  }

  const { title, noteText } = notePreview;

  const onNoteEdit = () => {
    dispatch(setEditStatus(true));
    dispatch(setNewTitle(title));
    dispatch(setNewNoteText(noteText));
  }

  return (
    <div className="col-7">
      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{noteText}</p>
          <Link
            to="/"
            className="card-link"
            onClick={() => dispatch(deleteNote(notePreview.id))}
          >
            Delete note
          </Link>
          <Link
            to={`/edit-note/${notePreview.id}`}
            className="card-link"
            onClick={() => onNoteEdit()}
          >
            Edit note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
