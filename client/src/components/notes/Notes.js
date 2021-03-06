import React from 'react';
import Note from './Note'
import NotesService from '../../services/NotesService'

const Notes = ({ notes, setNotes, socket }) => {
    
    // abstract away logic in Service functions
    const deleteNote = async (_id) => {
        NotesService.deleteNote(_id, notes, setNotes, socket)
    }

    const dropNote = e => {
        NotesService.dropNote(e, notes, setNotes, socket)
      };
      
    let allNotes = notes ? notes.map(note => <Note color={note.color} left={note.left} top={note.top} text={note.text} key={note._id} id={note._id} dropNote={dropNote} deleteNote={deleteNote} />) : [null]
    
    return (
        <div className="notes-area">
            {allNotes}
        </div>
    )
}

export default Notes;





