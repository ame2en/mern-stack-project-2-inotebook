import { useState } from "react";
import NoteContext from "./noteContext.js";

const host = "http://localhost:5000";

const NoteState = (props) => {
  const notesi = [];

  const [notes, setNotes] = useState(notesi);

  const getNotes = async () => {
    // Todo api call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });

    const json = await response.json();

    setNotes(json);
  };

  // Add a Note
  const addNote = async ({ title, description, tag }) => {
    // Todo api call
    const url = `${host}/api/notes/addanote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    setNotes(notes.concat(json));
  };

  // delete a Node
  const deleteNote = async (id) => {
    // add api call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  // Edit a Node

  const editNote = async (note) => {
    // todo api call
    // console.log("eiditing the the given element with id"+id);
    const id = note._id;
    const url = `${host}/api/notes/updatenote/${note._id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(note),
    });

    const json = await response.json();

    for (let index = 0; index < notes.length; index++) {
      if (note._id === notes[index]._id) {
        notes[index] = note;
      }
    }
    const newnotes = JSON.parse(JSON.stringify(notes));
    setNotes(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteState };
