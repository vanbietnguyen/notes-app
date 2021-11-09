import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CirclePicker } from 'react-color';
import service from '../../services/services'
import axios from 'axios'

const NotesModal = ({ notes, setNotes, closeModal }) => {
    // take the value from target and set it as the value sent back to notes
    const [notesInput, setNotesInput] = useState('')
    const [color, setColor] = useState('#68B6D9')

    const addNote = async (e) => {
        e.preventDefault()
        
        let textArea = document.querySelector('#note-text-area')
        textArea.value = ''

        let note = {
            'text': notesInput,
            'color': color,
            'top': '100',
            'left': '300',
        }
        console.log('prenote', note)
        // pass note into axios request
        let result = await axios.post('api/notes/add', note)
        // console.log(result.data, 'result')
        // get result and pass it into setNotes
        
        const newNotes = notes.slice()
        newNotes.push(result.data)
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