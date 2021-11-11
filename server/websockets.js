// const { server } = require('./server.js')
// const socket = require('socket.io')
// // sockets init

// let io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }
// })

// io.on("connection", (socket) => {
//   console.log(`New ${socket.id} connected`);

//   socket.on("addNotes", (data) => {
//     socket.broadcast.emit(`modifyNotes`, data); // Try to emit back to all the clients.
//   });

//   socket.on("modifyNotes", (data) => {
//     socket.broadcast.emit(`modifyNotes`, data); // Try to emit back to all the clients.
//   });

//   socket.on('drawing', (data) => {
//     console.log(data, 'data from drawing')
//     socket.broadcast.emit('drawing', data)
//   })

//   socket.on('startLines', (data) => {
//     console.log(data, 'data from drawing')
//     socket.broadcast.emit('startLines', data)
//   })




//   socket.on("disconnect", (e) => {

//     console.log(e, socket.id)
//     console.log("Client disconnected");
//     // clearInterval(interval);
//   });
// });


// module.exports = io