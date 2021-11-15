/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
import NotesService from '../services/NotesService'
import DrawingService from '../services/DrawingService'
import socketIOClient from "socket.io-client";
import config from '../config.js'

const ENDPOINT = config.SERVER_URI;
console.log(ENDPOINT)

const socket = socketIOClient(ENDPOINT);

const NotesContainer = () => {
  
    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState("eraser")

    // Use this to save start of new drawing which is the last line of lines)
    let lastLine = useRef(false)
    // save notes here to be accessed synchronously
    let notesRef = useRef(false)

    useEffect(async() => {
        let result = await NotesService.getNotes(setNotes)
        notesRef.current = result 
        DrawingService.getLines(setLines, lastLine)
    }, [])

    // websockets listeners
    useEffect(() => {
        // sending packets of data rather than entire lines array
        // cannot access state because useState is async and requires re-render(utilizing 3 lifecycle methods) 
        // cannot set useEffect second arg because it creates infinite loop
        // Must use useRef to store lastLine to have access to updated values prior to rendering
        // alternate solution is to use useReducer or Redux
   
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
            lastLine.points = lastLine.points.concat(data.points);
            setLines([...lines, lastLine])
        });
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