import React from 'react';
import Note from './Note'


const Notes = () => {

    // get all notes here

    // define functions for drag and drop here
    
    let fakeData = [1,2,3,4,5]
    const loadedNotes = fakeData.map((note) => <Note text={note} key={note} id={note} />)
    return (
        <div>
            note
            {loadedNotes}
        </div>
    )
}

export default Notes;