const express = require('express');
const notesController = require('../controllers/notesController.js');
const router = express.Router();
 
router.get('/', notesController.get, (req, res) => {
  const result = res.locals.notes
  return res.status(200).send(result)
})

router.post('/add', notesController.add, (req, res) => {
  return res.status(200).json(res.locals.note)
})

router.post('/update', notesController.update, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result)
})

router.post('/delete', notesController.delete, (req, res) => res.status(200))

router.post('/clearNotesLines', notesController.clear, (req, res) => res.status(200))





module.exports = router;