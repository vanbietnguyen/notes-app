const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080
const cors = require('cors')
const socket = require('socket.io')

const notesRouter = require('./routers/notesRouter.js')
const linesRouter = require('./routers/linesRouter.js');
const { default: axios } = require('axios');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.sendStatus(200));


//routers
// app.use('/api/login')
app.use('/api/notes', notesRouter)
app.use('/api/lines', linesRouter)
// app.use('api/lines')

let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// sockets init
let io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
})


// io.on('connection', (socket) => {
//   console.log(`socket is connected`);
//   socket.on("notes", (notes) => {
//     console.log(notes, 'notes')
//     io.emit(`lines`, notes);
//   })
// })

let storedNotes;

io.on("connection", (socket) => {
  console.log(`New ${socket.id} connected`);

  
  socket.emit("FromAPI", `response5`);

  socket.on("modify", (note) => {
    console.log(note, 'note from modify')
    io.emit(`modify`, note); // Try to emit back to all the clients.
  });

  socket.on("disconnect", (e) => {

    console.log(e, socket.id)
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});



module.exports = { app };

// sockets init
// let io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }
// })

// io.on('connection', (socket) => {
//   console.log(`socket is connected`);
//   // socket.on("lines", (lines) => io.emit(`lines`, lines));s
// })


