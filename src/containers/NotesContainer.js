import React, { useState, useRef } from 'react';
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
                        // ref={modalRef} 
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