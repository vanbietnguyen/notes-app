import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const NotesCreator = ({ notes, setNotes }) => {
    // take the value from target and set it as the value sent back to notes
    const [notesInput, setNotesInput] = useState('')

    const addNote = (e) => {
        e.preventDefault()

        let note = {
            'id': uuid(),
            'created-at': new Date().toDateString(),
            'text': notesInput,
        }
        
        const newNotes = notes.slice()
        newNotes.push(note)
        setNotes(newNotes)
    }

    return (
        <div>
            <form>
                <textarea  onChange={(e)=> setNotesInput(e.target.value)} placeholder="what's on your mind?"></textarea>
                <input onClick={(e) => addNote(e)} type="submit"></input>
            </form>
        </div>
    )
}

// onChange={(e)=> setNotesInput(e.target.value)}

export default NotesCreator;