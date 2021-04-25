import StickyContainer from "./component/StickyContainer";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "./action/stickyAction";

function App() {
  const defaultNote = {
    name: "New Note",
    updateDate: new Date().toUTCString(),
    noteText: "",
    position: {
      x: 20,
      y: 20,
    },
  };

  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const stickynote = useSelector((store) => store.stickynote.notes);

  useEffect(() => {
    setNotes(stickynote);
    localStorage.setItem("stickynotes", JSON.stringify(stickynote));
  }, [stickynote]);

  const createNote = () => {
    dispatch(updateNotes([...notes, { ...defaultNote }]));
  };

  const deleteNote = (index) => {
    if (notes.length > 1) {
      const updatedNote = [...notes].filter((item, ind) => ind !== index);
      dispatch(updateNotes(updatedNote));
    }
  };

  const updateNote = (index, noteText, heading, updatePosition) => {
    const updateNoteItem =
      notes &&
      notes.map((item, ind) => {
        if (index === ind) {
          if (heading) {
            return {
              name: noteText,
              updateDate: new Date().toUTCString(),
              noteText: item.noteText,
              position: item.position,
            };
          } else if (updatePosition) {
            return {
              name: item.name,
              updateDate: new Date().toUTCString(),
              noteText: item.noteText,
              position: updatePosition,
            };
          } else {
            return {
              name: item.name,
              updateDate: new Date().toUTCString(),
              noteText,
              position: item.position,
            };
          }
        }
        return item;
      });
    dispatch(updateNotes(updateNoteItem));
  };

  return (
    <div className="App">
      {notes &&
        notes.map((item, index) => (
          <StickyContainer
            createNote={createNote}
            deleteNote={deleteNote}
            updateNote={updateNote}
            noteDetail={item}
            index={index}
            key={index}
            notes={notes}
          />
        ))}
    </div>
  );
}

export default App;
