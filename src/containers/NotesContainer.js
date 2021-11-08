import React, { useState } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
// import services from '../services/services'


const NotesContainer = () => {

    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState("eraser")

    // const openModal = () => console.log('open Modal triggered')
    

    const changeModal = () => {
        if(drawPointer) setDrawPointer(false)
        setModal(prev => !prev)
    }

    const changePointer = () => {
        let canvas = document.querySelector('.canvas-stage')
        if(drawPointer) canvas.style.zIndex = -1
        // else canvas.style.zIndex = 99
        setDrawPointer(false)
    }

    const changeTool = (selectedTool) => {
        let canvas = document.querySelector('.canvas-stage')
        // if(drawPointer) canvas.style.zIndex = -1
        canvas.style.zIndex = 99
        setDrawPointer(true)

        setTool(selectedTool)
        console.log('selected', selectedTool)
        console.log(tool)
    }

    return (
        <div className="notes-container">
            
            { showModal ? 
                <NotesModal notes={notes} setNotes={setNotes} closeModal={changeModal} /> 
                : 
                <>
                    <Sidebar changePointer={changePointer} notes={notes} changeTool={changeTool} setNotes={setNotes} setLines={setLines} openModal={changeModal} />
                    <Notes notes={notes} setNotes={setNotes} />
                    <CanvasArea  drawPointer={drawPointer} tool={tool} lines={lines} setLines={setLines}/>
                </> }
            
        </div>
    )
}

export default NotesContainer;