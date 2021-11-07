import React from 'react';
import ClearButton from '../components/sidebar/ClearButton'
import NotesButton from '../components/sidebar/NotesButton'

const Sidebar = ({ notes, setNotes, openModal }) => {
    return (
        <div id="sidebar">
            <NotesButton openModal={openModal} />
            <ClearButton notes={notes} setNotes={setNotes} />
        </div>
    )
};

export default Sidebar;