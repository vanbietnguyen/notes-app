import React from 'react';
import Note from './Note'
import axios from 'axios'

const Notes = ({ notes, setNotes }) => {
    
    // abstract away
    const deleteNote = (_id) => {
        
        let newNotes = notes.reduce((acc, curr) => {
            if(curr._id !== _id) acc.push(curr)
            return acc
        }, [])

        setNotes(newNotes)
        axios.post('api/notes/delete', { _id })
    }

    const dropNote = async event => {
        let left = event.pageX - 50
        let top = event.pageY - 50

        let w = window.innerWidth;
        let h = window.innerHeight;

        let minWidth = (0 * w) / 100;
        let minHeight = (0 * h) / 100;
        let maxWidth = (85 * w) / 100;
        let maxHeight = (80 * h) / 100;

        if(left < 0) left = minWidth - 25
        if(left > maxWidth) left = maxWidth - 210
        if(top < 0) top = minHeight - 25
        if(top > maxHeight) top = maxHeight - 130

        event.target.style.left = `${left}px`;
        event.target.style.top = `${top}px`;
        
        let id = event.target.id
        let note = notes.filter((n) => n._id === id)
        let other = notes.filter((n) => n._id !== id)
        note[0].left = left
        note[0].top = top
        setNotes([...other, ...note])

        await axios.post('api/notes/update', { id, left, top })
      };

    const allNotes = notes.map(note => {
        
        return <Note color={note.color} left={note.left} top={note.top} text={note.text} key={note._id} id={note._id} dropNote={dropNote} deleteNote={deleteNote} />
    })

    return (
        <div className="notes-area">
            {allNotes}
        </div>
    )
}

export default Notes;





