const axios = require('axios')
const mongoose = require('mongoose');
const models = require('../db/models.js');

const notesController = {};

notesController.get = async (req, res, next) => {
  try {
    const notesDocs = await models.Note.find({});
    res.locals.notes = notesDocs;
    next();
  } catch(err) {
    console.log({ log: 'err in gettingnNotes', err: err });
  }

}

notesController.add = async (req, res, next) => {
  try {
    const { text, color, top, left } = req.body
    const result = await models.Note.create({ text, color, top, left });
    res.locals.note = result
    return next()
  } catch(err) {
    return next(err)
  }

}

notesController.update = async (req, res, next) => {
    try {
      const { id, ...rest } = req.body
      await models.Note.findOneAndUpdate({ _id: id }, rest)
      return next();
    } catch (e) {
      return next(e);
    }
  };

notesController.delete = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await models.Note.deleteOne({ _id });

  } catch(e) {
    return next(e)
  }

}

notesController.clear = async (req, res, next) => {
  try {
    await models.Note.deleteMany({})
    await models.Line.deleteMany({})
  } catch (e) {
    return next(e)
  }  
}
 
module.exports = notesController;