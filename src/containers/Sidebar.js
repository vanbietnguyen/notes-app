import React, { useState } from 'react';
import ClearButton from '../components/sidebar/ClearButton'
import NotesButton from '../components/sidebar/NotesButton'
import EraserButton from '../components/sidebar/EraserButton'
import PenButton from '../components/sidebar/PenButton'
import PointerButton from '../components/sidebar/PointerButton'

const Sidebar = ({ notes, setNotes, openModal, changeTool, changePointer, setLines, lines }) => {
    // const [active, setActive] => useState()
    // const setActive = () =>
    // set active will find the div based on document selector or ref? change the className to create a toggle
        // only add for pointer eraser and pen
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