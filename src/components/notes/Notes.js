import React from 'react';
import Note from './Note'

const Notes = ({ notes, setNotes }) => {
    
    // defined both delete and dropNote here to consolidate functinality

    const deleteNote = (id) => {
            
        let newNotes = notes.reduce((acc, curr) => {
            if(curr.id !== id) acc.push(curr)
            return acc
        }, [])

        setNotes(newNotes)
    }

    const dropNote = event => {
        event.target.style.left = `${event.pageX - 50}px`;
        event.target.style.top = `${event.pageY - 50}px`;
      };

    const allNotes = notes.map(note => {

        return <Note text={note.text} key={note.id} id={note.id} dropNote={dropNote} deleteNote={deleteNote} />
    })

    return (
        <div>{allNotes}</div>
    )
}

export default Notes;





