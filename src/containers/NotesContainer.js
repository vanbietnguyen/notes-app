/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
import axios from 'axios';
// import services from '../services/services'

const NotesContainer = () => {

    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState("eraser")

    useEffect(async() => {
        let notes = await axios.get('api/notes/')
        setNotes(notes.data)
    }, [])

    useEffect(async() => {
        let result = await axios.get('api/lines/')

        for(let line of result.data) {
            delete line._id
            delete line.__v
        }
        setLines(result.data)
    }, [])
    
    // set lines from db here

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
                        notes={notes} 
                        setNotes={setNotes} 
                        closeModal={changeModal}
                    />
                    <div className="modalToggle">
                        <Sidebar 
                            changePointer={changePointer} 
                            notes={notes} 
                            changeTool={changeTool} 
                            setNotes={setNotes} 
                            setLines={setLines} 
                            openModal={changeModal} 
                        />
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