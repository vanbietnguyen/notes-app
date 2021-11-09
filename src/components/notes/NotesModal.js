import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CirclePicker } from 'react-color';
import Service from '../../services/Services'

const NotesModal = ({ notes, setNotes, closeModal }) => {
    // take the value from target and set it as the value sent back to notes
    const [notesInput, setNotesInput] = useState('')
    const [color, setColor] = useState('#68B6D9')

    const addNote = (e) => {
        e.preventDefault()
        
        let textArea = document.querySelector('#note-text-area')
        textArea.value = ''

        let note = {
            'id': uuid(),
            'created-at': new Date().toDateString(),
            'text': notesInput,
            'color': color,
            'positionX': null,
            'positionY': null
        }
        
        Service.save('NOTE', note)
        
        const newNotes = notes.slice()
        newNotes.push(note)
        setNotes(newNotes)
        closeModal()
        
    }

    return (
        <div className="notes-modal">
            <div id="color-picker">
                <CirclePicker
                    color={color}
                    colors={['#68B6D9', '#B0D989', '#F3E5AD', '#F899A4', '#B788E2']}
                    onChange={update => setColor(update.hex)}
                />

            </div>
            

            <form>
                <textarea  id="note-text-area" onChange={(e)=> setNotesInput(e.target.value)} placeholder="what's on your mind?"></textarea>
                <input onClick={(e) => addNote(e)} value="+" type="submit"></input>
            </form>
        </div>
    )
}

// onChange={(e)=> setNotesInput(e.target.value)}

export default NotesModal;