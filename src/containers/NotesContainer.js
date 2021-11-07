import React, { useState } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'


const NotesContainer = () => {

    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)

    // const openModal = () => console.log('open Modal triggered')
    const changeModal = () => setModal(prev => !prev)

    return (
        <div className="notes-container">
            
            { showModal ? 
                    <NotesModal notes={notes} setNotes={setNotes} closeModal={changeModal} /> 
            : 
                <>
                    <Sidebar notes={notes} setNotes={setNotes} openModal={changeModal}/>
                    <Notes notes={notes} setNotes={setNotes} />
                </> }
            
        </div>
    )
}

export default NotesContainer;