import React, { useState } from 'react';
import ClearButton from '../components/sidebar/ClearButton'
import NotesButton from '../components/sidebar/NotesButton'
import EraserButton from '../components/sidebar/EraserButton'
import PenButton from '../components/sidebar/PenButton'
import PointerButton from '../components/sidebar/PointerButton'

const Sidebar = props => {
    const { notes,
            setNotes, 
            openModal, 
            changeTool, 
            changePointer, 
            setLines, 
            socket, 
            pointerClass } = props
            
    const [active, setActive] = useState('pointer')
    const changeClassName = (ref) => {
        let id = ref.id
        if(active) {
            if(active.id === id) return;
            let activeEle = document.querySelector(`#${active}`)
            console.log(activeEle.className, 'active')
            activeEle.className = 'sidebar-button'
        }

        setActive(id)
        ref.className = `${ref.className} active`
        console.log(ref.className, 'classname ref')
    }
    return (
        <div id="sidebar">
            <NotesButton changeClassName={changeClassName} openModal={openModal} />
            <PointerButton pointerClass={pointerClass} changePointer={changePointer} setActive={setActive} changeClassName={changeClassName}/>
            <ClearButton notes={notes} setNotes={setNotes} setLines={setLines} socket={socket}/>
            <EraserButton changeTool={changeTool} changeClassName={changeClassName}/>
            <PenButton changeTool={changeTool} changeClassName={changeClassName}/>
        </div>
    )
};

export default Sidebar;