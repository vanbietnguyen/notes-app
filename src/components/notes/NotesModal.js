import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const NotesModal = ({ notes, setNotes, closeModal }) => {
    // take the value from target and set it as the value sent back to notes
    const [notesInput, setNotesInput] = useState('')

    const addNote = (e) => {
        e.preventDefault()
        
        let textArea = document.querySelector('#note-text-area')
        textArea.value = ''

        let note = {
            'id': uuid(),
            'created-at': new Date().toDateString(),
            'text': notesInput,
        }
        
        const newNotes = notes.slice()
        newNotes.push(note)
        setNotes(newNotes)
        closeModal()

    }

    return (
        <div className="notes-modal">
            <form>
                <textarea  id="note-text-area" onChange={(e)=> setNotesInput(e.target.value)} placeholder="what's on your mind?"></textarea>
                <input onClick={(e) => addNote(e)} value="+" type="submit"></input>
            </form>
        </div>
    )
}

// onChange={(e)=> setNotesInput(e.target.value)}

export default NotesModal;