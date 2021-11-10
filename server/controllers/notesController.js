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

notesController.updateNote = async (req, res, next) => {
    // takes in form data and updates the User document
    try {
      const { id, text, color, top, left } = req.body;
      let note = await models.findOneAndUpdate(
        { _id: id },
        { $push: { text: text, color: color, top: top, left: left } }
      );

      res.locals.note = note;
      return next();
    } catch (e) {
      return next(e);
    }
  };

notesController.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.body;
    await models.deleteOne({ _id: id });
  } catch(e) {
    return next(e)
  }

}

notesController.clearNotes = async (req, res, next) => {
  try {
    await models.deleteMany({})
  } catch (e) {
    return next(e)
  }  
}
 
module.exports = notesController;