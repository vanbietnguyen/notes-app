const mongoose = require('mongoose');
const config = require('../config');
const MONGO_URI = config.db.host;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'notes-app'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: {type: String, required: true},
    color: {type: String, required: true},
    top: {type: Number, required: true},
    left: {type: Number, required: true},
})

const Note = mongoose.model('note', noteSchema);

module.exports = { Note }