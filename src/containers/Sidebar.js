import React from 'react';
import ClearButton from '../components/sidebar/ClearButton'
import NotesButton from '../components/sidebar/NotesButton'
import EraserButton from '../components/sidebar/EraserButton'
import PenButton from '../components/sidebar/PenButton'
import PointerButton from '../components/sidebar/PointerButton'

const Sidebar = ({ notes, setNotes, openModal, changeTool, changePointer, setLines }) => {
    return (
        <div id="sidebar">
            <NotesButton openModal={openModal} />
            <PointerButton changePointer={changePointer} />
            <ClearButton notes={notes} setNotes={setNotes} setLines={setLines}/>
            <EraserButton changeTool={changeTool} />
            <PenButton changeTool={changeTool} />
        </div>
    )
};

export default Sidebar;