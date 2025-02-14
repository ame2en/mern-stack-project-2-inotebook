import React from "react";
import { useContext } from "react";
import notecontext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(notecontext);
  const { deleteNote, editNote } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3 ">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">#{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
