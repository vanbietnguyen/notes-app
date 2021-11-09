const axios = require('axios')
const mongoose = require('mongoose');
const models = require('../db/models.js');

const notesController = {};

notesController.getNotes = async (req, res, next) => {
  try {
    const notesDocs = await models.Note.find({});
    res.locals.notes = notesDocs;
    next();
  } catch(err) {
    console.log({ log: 'err in gettingnNotes', err: err });
  }

}

notesController.addNote = async (req, res, next) => {
  try {
    const { text, color, top, left } = req.body
    const result = await models.Note.create({ text, color, top, left });
    console.log('result:', result)
    res.locals.note = result
    return next()
  } catch(err) {
    return next(err)
  }

}

notesController.updateNote = (req, res, next) => {
  
}

notesController.deleteNote = (req, res, next) => {

}

notesController.clearNotes = (req, res, next) => {

}
 
module.exports = notesController;