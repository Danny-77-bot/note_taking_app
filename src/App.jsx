import React, { useState, useEffect } from 'react';
import './app.css';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateNote from './components/CreateNote';

function App() {
  const [noteLists, setNoteLists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/notes')
      .then(result => setNoteLists(result.data))
      .catch(error => {
        console.error(error);
        resizeBy.sendStatus(500);
      });
  }, []);

  function deleteItem(id) {
    axios.delete(`http://localhost:8000/delete/${id}`)
      .then(result => {
        location.reload();
      })
      .catch(err => console.log(err));
  }

  // Function to check if content is long and add the 'long' class
  function checkContentLength(content) {
    return content.length > 30 ? 'noteContent long' : 'noteContent';
  }

  return (
    <>
      <Header />
      <CreateNote />
      <div className="notelists">
        {noteLists.map(noteList => (
          <div key={noteList._id} className="noteItem">
            <span className="noteTitle">{noteList.title}</span>
            <span className={checkContentLength(noteList.content)}>{noteList.content}</span>
            <button className='delbtn' onClick={() => deleteItem(noteList._id)}>delete</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;