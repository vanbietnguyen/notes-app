const express = require('express');
const notesController = require('../controllers/notesController.js');
const router = express.Router();

//instead of adding individual notes, i can just remove an entire array of notes
 
router.get('/', notesController.getNotes, (req, res) => {
  const result = res.locals.notes
  return res.status(200).send(result)
})

router.post('/add', notesController.addNote, (req, res) => {
  // const result = res.locals.note;
  // console.log('result in addNote:', result)
  return res.status(200).json(res.locals.note)
})

router.put('/updateNote', notesController.updateNote, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

router.delete('/deleteNote', notesController.deleteNote, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})






module.exports = router;