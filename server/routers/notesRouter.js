const express = require('express');
const notesController = require('../controllers/notesController.js');
const router = express.Router();

//instead of adding individual notes, i can just remove an entire array of notes
 
router.get('/getNotes', notesController.getNotes, (req, res) => {
  const result = res.locals.notes
  return res.status(200).send(result)
})

router.post('/addNote', notesController.addNote, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

router.put('/updateNote', notesController.updateNote, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

router.delete('/deleteNote', notesController.deleteNote, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

// one for clearing canvas
// one for clearing all notes




module.exports = router;