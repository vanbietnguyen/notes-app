const mongoose = require('mongoose');
const config = require('../config');
const MONGO_URI = config.db.host;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'notes-app'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: {type: String },
    color: {type: String, required: true},
    top: {type: Number, required: true},
    left: {type: Number, required: true},
})

const Note = mongoose.model('note', noteSchema);

const lineSchema = new Schema({
  tool: {type: String, required: true},
  points: {type: Array, required: true},
})

const Line = mongoose.model('line', lineSchema);

module.exports = { Note, Line }