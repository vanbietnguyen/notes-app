/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
import NotesService from '../services/NotesService'
import DrawingService from '../services/DrawingService'
// import config from '../config.js'
import { SocketContext } from './SocketContext'

const NotesContainer = () => {
    const { setLines, setNotes, notes, lines, notesRef } = useContext(SocketContext);
  
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [tool, setTool] = useState("eraser")


    useEffect(async() => {
        let result = await NotesService.getNotes(setNotes)
        notesRef.current = result 
        DrawingService.getLines(setLines)
    }, [])

    // websockets listeners
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
                        notes={notes} 
                        setNotes={setNotes} 
                        closeModal={changeModal}
                    />
                    <div className="modalToggle">
                        <Sidebar pointerClass='sidebar-button' />
                        <Notes notes={notes} setNotes={setNotes} />
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
                        pointerClass='sidebar-button active' 
                    />
                    <Notes notes={notes} setNotes={setNotes} />
                    <CanvasArea  
                        drawPointer={drawPointer} 
                        tool={tool} 
                        lines={lines} 
                        setLines={setLines}
                    />
                </> }  
        </div>
    )
}

export default NotesContainer;