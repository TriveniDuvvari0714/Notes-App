import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import CreateNewNote from "./CreateNewNote";
import Navbar from "./Navbar";
import NotePreview from "./NotePreview";
import NotesList from "./NotesList";

import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "../redux/actions/handleNoteList";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const notesList = useSelector((state: AppState) => state.notesList);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    dispatch(fetchNotes(notes));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  return (
    <div className="container">
      <Switch>
        <Route path="/create-note" exact>
          <CreateNewNote />
        </Route>

        <Route path="/edit-note/:id?" exact>
          <CreateNewNote/>
        </Route>

        <Route path="/:id?" exact>
          <Navbar />
          <div className="row">
            <NotesList />
            <NotePreview />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
