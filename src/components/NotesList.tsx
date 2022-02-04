import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const NotesList: React.FC = () => {
  const { notesList, searchText } = useSelector((state: AppState) => state);

  return (
    <div className="col-5">
      {notesList
        .filter((note) =>
          searchText
            ? note.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            : note
        )
        .map((note) => (
          <Note
            key={note.id}
            id={note.id}
            date={note.date}
            noteText={note.noteText}
            title={note.title}
          />
        ))}
    </div>
  );
};

export default NotesList;
