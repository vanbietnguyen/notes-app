import React, { useState } from 'react';
import Notes from '../components/notes/Notes'
import NotesCreator from '../components/notes/NotesCreator'

const NotesContainer = () => {

    const [notes, setNotes] = useState([])

    return (
        <div>
            <NotesCreator notes={notes} setNotes={setNotes} />
            <Notes notes={notes} setNotes={setNotes} />
        </div>
    )
}

export default NotesContainer;