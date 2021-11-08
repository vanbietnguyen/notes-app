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
        let xCoordinate = event.pageX - 50
        let yCoordinate = event.pageY - 50

        let w = window.innerWidth;
        let h = window.innerHeight;

        let minWidth = (0 * w) / 100;
        let minHeight = (0 * h) / 100;
        let maxWidth = (85 * w) / 100;
        let maxHeight = (80 * h) / 100;

        if(xCoordinate < 0) xCoordinate = minWidth - 25
        if(xCoordinate > maxWidth) xCoordinate = maxWidth - 210
        if(yCoordinate < 0) yCoordinate = minHeight - 25
        if(yCoordinate > maxHeight) yCoordinate = maxHeight - 130

        event.target.style.left = `${xCoordinate}px`;
        event.target.style.top = `${yCoordinate}px`;
      };

    const allNotes = notes.map(note => {

        return <Note color={note.color} text={note.text} key={note.id} id={note.id} dropNote={dropNote} deleteNote={deleteNote} />
    })

    return (
        <div className="notes-area">
            {allNotes}
        </div>
    )
}

export default Notes;





