import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import NotesService from '../services/NotesService'

const SocketContext = createContext();
const socket = io('https://koala-notes-app.herokuapp.com/');

const ContextProvider = ({ children }) => {
  // video
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [callEnded, setCallEnded] = useState(false);
  // const [stream, setStream] = useState();
  // const [name, setName] = useState('');
  // const [call, setCall] = useState({});
  // const [me, setMe] = useState('');

  // const myVideo = useRef({});
  // const userVideo = useRef({});
  // const connectionRef = useRef(null);

  // notes and lines
  const [notes, setNotes] = useState([])
  const [lines, setLines] = useState([]);
  // Use this to save start of new drawing which is the last line of lines)
  let lastLine = useRef(false)
  // save notes here to be accessed synchronously
  let notesRef = useRef(false)

  

  useEffect(() => {
    // video
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);
    //     myVideo.current.srcObject = currentStream;
    //   });

    // socket.on('me', (id) => setMe(id));

    // socket.on('callUser', ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });

// notes and lines
    socket.on("addNotes", (data) => {
      notesRef.current.push(data)
      setNotes([...notes, data])
  });
  socket.on("moveNotes", (data, id) => {
      notesRef.current = notesRef.current.filter((n) => n._id !== id)
      notesRef.current.push(data)
      setNotes(notesRef.current)
  });
  socket.on("deleteNotes", (id) => {
      notesRef.current = notesRef.current.filter((n) => n._id !== id)
      setNotes(notesRef.current)
  });
  socket.on("drawing", (data) => {
      // set lastLine as start of newLine to be used in drawingMove
      lastLine = data
      if(!lines.length) setLines([data])
      else setLines([...lines, data])
  });
  socket.on("drawingMove", (data) => {
      // update reference with coordinates being sent
      lastLine.points = lastLine.points.concat(data);
      setLines([...lines, lastLine])
  });
  socket.on("clearAll", () => {
      setNotes([])
      setLines([])
  });
  }, []);

  // video
  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({ initiator: false, trickle: false, stream });

  //   peer.on('signal', (data) => {
  //     socket.emit('answerCall', { signal: data, to: call.from });
  //   });

    // peer.on('stream', (currentStream) => {
    //   userVideo.current.srcObject = currentStream;
    // });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = (id) => {
  //   const peer = new Peer({ initiator: true, trickle: false, stream });

  //   peer.on('signal', (data) => {
  //     socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
  //   });

  //   peer.on('stream', (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   socket.on('callAccepted', (signal) => {
  //     setCallAccepted(true);

  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);

  //   connectionRef.current.destroy();

  //   window.location.reload();
  // };

  return (
    <SocketContext.Provider value={{
      // call,
      // callAccepted,
      // myVideo,
      // userVideo,
      // stream,
      // name,
      // setName,
      // callEnded,
      // me,
      // callUser,
      // leaveCall,
      // answerCall,
      setLines,
      setNotes,
      notes,
      lines,
      notesRef,
      lastLine,
      socket,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };