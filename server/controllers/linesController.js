const axios = require('axios')
const mongoose = require('mongoose');
const models = require('../db/models.js');

const linesController = {};

linesController.get = async (req, res, next) => {
  try {
    const lines = await models.Line.find({})
    res.locals.lines = lines;
    next();
  } catch(err) {
    console.log({ log: 'err in gettingnNotes', err: err });
  }
}

linesController.add = async (req, res, next) => {
  try {
    const { line } = req.body
    await models.Line.create(line);
    return next()
  } catch(err) {
    return next(err)
  }

}

linesController.update = async (req, res, next) => {
    try {
      const { id, ...rest } = req.body
      let note = await models.Note.findOneAndUpdate({ _id: id }, rest)
      return next();
    } catch (e) {
      return next(e);
    }
  };

linesController.delete = async (req, res, next) => {
  try {
    console.log(req.body, 'reqbody in delete')
    const { _id } = req.body;
    await models.Note.deleteOne({ _id });

  } catch(e) {
    return next(e)
  }

}

linesController.clear = async (req, res, next) => {
  try {
    await models.Note.deleteMany({})
  } catch (e) {
    return next(e)
  }  
}
 
module.exports = linesController;