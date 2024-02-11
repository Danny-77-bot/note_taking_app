import React, { useState } from 'react';
import "./createNote.css";
import axios from 'axios';
export default function CreateNote() {
  const [notes, setNotes] = useState({
    title: "",
    content: ""
  });

  function handleInputs(event) {
    const { name, value } = event.target;
    setNotes(prevNotes => {
      return {
        ...prevNotes,
        [name]: value
      };
    });
   
  }

  function handleAddNote() {
    axios.post('http://localhost:8000/add', notes)
      .then(result => {
        location.reload();
        setNotes({
          title:"",
          content:""
        })
      })
      .catch(error => {
        console.error(error);
      });
  
  }

  function handleTextAreaResize(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  return (
    <div className='note'>
      <input
        name="title"
        onChange={handleInputs}
        placeholder='Title'
        value={notes.title}
      />
      <textarea
        name="content"
        onChange={handleInputs}
        onInput={handleTextAreaResize}
        placeholder='Note...'
        rows="3"
        value={notes.content}
      />
      <button className='addbtn' onClick={handleAddNote}>Add</button>
    </div>
  );
}