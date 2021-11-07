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

    // converting pixels to vh/vw (for later)
    // px in vw: 100 * px / windowWidth.
    // px in vh: 100 * px / windowHeight.

    const dropNote = event => {
        let xCoordinate = event.pageX - 50
        let yCoordinate = event.pageY - 50

        if(xCoordinate < 65) xCoordinate = 65
        if(xCoordinate > 1100) xCoordinate = 1100
        if(yCoordinate < 10) yCoordinate = 10
        if(yCoordinate > 450) yCoordinate = 450

        event.target.style.left = `${xCoordinate}px`;
        event.target.style.top = `${yCoordinate}px`;
      };

    const allNotes = notes.map(note => {

        return <Note text={note.text} key={note.id} id={note.id} dropNote={dropNote} deleteNote={deleteNote} />
    })

    return (
        <div>{allNotes}</div>
    )
}

export default Notes;





