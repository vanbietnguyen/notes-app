import axios from "axios";

const notesController = {};

notesController.getNotes = async (req, res, next) => {
  try {
    const result = await axios.get('/getNotes')
    res.locals.notes = result.data
    return next()
  } catch(err) {
    return next(err)
  }

}

// notesController.addNotes = async (req, res, next) => {
//   try {
//     const result = await axios.post('/addNotes')
//     res.locals.notes = result.data
//     return next()
//   } catch(err) {
//     return next(err)
//   }

// }

notesController.addNote = (req, _res, next) => {
  // const { title, description } = req.body;
  // const params = [title, description, ssid];
  // const insertQuestion =
  //   "INSERT INTO questions (title,description,creator) VALUES ($1,$2,$3) RETURNING questions";

  // pool
  //   .query(insertQuestion, params)
  //   .then((_data) => {
  //     return next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return next({
  //       status: 500,
  //       message: "Error creating Questions",
  //     });
  //   });
};

notesController.updateNote = (req, res, next) => {
  
}

notesController.deleteNote = (req, res, next) => {

}

notesController.clearNotes = (req, res, next) => {

}
 
module.exports = notesController;