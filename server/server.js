const express = require('express');
const app = express();
const PORT = 8080
const cors = require('cors')
const socket = require('socket.io')

const notesRouter = require('./routers/notesRouter.js')
const linesRouter = require('./routers/linesRouter.js');

// dependencies
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// index
app.get('/', (req, res) => res.sendStatus(200));


//routers
app.use('/api/notes', notesRouter)
app.use('/api/lines', linesRouter)

let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

let io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
})

io.on("connection", (socket) => {
  console.log(`New ${socket.id} connected`);
  socket.on("modifyNotes", (data) => socket.broadcast.emit(`modifyNotes`, data)); 
  socket.on("clearAll", () => socket.broadcast.emit(`clearAll`));
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('startLines', (data) => socket.broadcast.emit('startLines', data))
  socket.on("disconnect", (e) => console.log("Client disconnected"));
});



module.exports = { app, server };


