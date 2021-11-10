const express = require('express');
const notesController = require('../controllers/notesController.js');
const router = express.Router();

//instead of adding individual notes, i can just remove an entire array of notes
 
router.get('/', notesController.getNotes, (req, res) => {
  const result = res.locals.notes
  return res.status(200).send(result)
})

router.post('/add', notesController.addNote, (req, res) => {
  return res.status(200).json(res.locals.note)
})

router.post('/update', notesController.update, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

router.post('/delete', notesController.delete, (req, res) => res.status(200))

router.post('/clear', notesController.clear, (req, res) => res.status(200))





module.exports = router;