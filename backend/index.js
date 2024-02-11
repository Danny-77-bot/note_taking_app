const express = require('express');
const mongoose = require("mongoose");
const Note = require("./model/noteModel");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.post('/add', (req, res) => {
  const { title, content } = req.body;
  console.log(title);
  console.log(content);
  const newNote = new Note({
    title,
    content
  });
  newNote.save()
    .then(() => {
      console.log("Note saved successfully");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
 
//to retireve all the data elements
server.get('/notes', (req, res) => {
    Note.find()
      .then(notes => {
        res.json(notes);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  });

  server.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    Note.findByIdAndDelete({_id:id})
    .then(result=>{
        res.json(result);
    }).catch(error=>{
        console.error(error);
    })
  })

mongoose.connect("mongodb://localhost:27017/notes")
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });