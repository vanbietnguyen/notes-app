/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
import NotesService from '../services/NotesService'
import DrawingService from '../services/DrawingService'
import socketIOClient from "socket.io-client";
// process.env
// const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";
const ENDPOINT = "http://koala-notes-app.herokuapp.com/";

const socket = socketIOClient(ENDPOINT);

const NotesContainer = () => {
  
    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState("eraser")
    
    useEffect(async() => {
        NotesService.getNotes(setNotes)
        DrawingService.getLines(setLines)
    }, [])

    // websockets listeners
    useEffect(() => {
        socket.on("modifyNotes", (data) => setNotes(data));
        socket.on("drawing", (data) => setLines(data));
        socket.on("clearAll", () => {
            setNotes([])
            setLines([])
        });
    }, [socket]);

    const changeModal = () => {
        if(drawPointer) setDrawPointer(false)
        setModal(prev => !prev)
    }

    const changePointer = () => {
        let canvas = document.querySelector('.canvas-stage')
        // set canvas to back
        if(drawPointer) canvas.style.zIndex = -1
        setDrawPointer(false)
    }

    const changeTool = (selectedTool) => {
        let canvas = document.querySelector('.canvas-stage')
        canvas.style.zIndex = 99
        setDrawPointer(true)
        setTool(selectedTool)
    }

    return (
        <div className="notes-container">
            { showModal ? 
                <>
                    <NotesModal
                        socket={socket}
                        notes={notes} 
                        setNotes={setNotes} 
                        closeModal={changeModal}
                    />
                    <div className="modalToggle">
                        <Sidebar pointerClass='sidebar-button' />
                        <Notes notes={notes} setNotes={setNotes} socket={socket}/>
                        <CanvasArea  
                            drawPointer={drawPointer} 
                            tool={tool} 
                            lines={lines} 
                            setLines={setLines}
                        />
                    </div> 
                    
                </>
                :  ///////////////ELSE/////////////////////////////////////////////
                <>
                    <Sidebar 
                        changePointer={changePointer} 
                        notes={notes} 
                        changeTool={changeTool} 
                        setNotes={setNotes} 
                        setLines={setLines} 
                        openModal={changeModal}
                        socket={socket}
                        pointerClass='sidebar-button active' 
                    />
                    <Notes notes={notes} setNotes={setNotes} socket={socket} />
                    <CanvasArea  
                        drawPointer={drawPointer} 
                        tool={tool} 
                        lines={lines} 
                        setLines={setLines}
                        socket={socket}
                    />
                </> }  
        </div>
    )
}

export default NotesContainer;