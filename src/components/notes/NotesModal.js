import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import NotesService from '../../services/NotesService'

const NotesModal = ({ notes, setNotes, closeModal, socket }) => {
    // take the value from target and set it as the value sent back to notes
    const [notesInput, setNotesInput] = useState('')
    const [color, setColor] = useState('#68B6D9')
    
    const addNote = async (e) => {
        e.preventDefault()

        let note = {
            'text': notesInput,
            'color': color,
            'top': '100',
            'left': '300',
        }

        NotesService.addNote(e, setNotes, notes, note, socket)
        closeModal()
    };
        

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
                <textarea style={{backgroundColor: color}}id="note-text-area" onChange={(e)=> setNotesInput(e.target.value)} placeholder="what's on your mind?"></textarea>
                <br/>
                <div className="form-buttons"> 
                    <input className="form-button" onClick={(e) => closeModal()} value="cancel" type="submit"></input>
                    <input className="form-button" onClick={(e) => addNote(e)} value="submit" type="submit"></input>
                </div>
               
            </form>
        </div>
    )
}

// onChange={(e)=> setNotesInput(e.target.value)}

export default NotesModal;