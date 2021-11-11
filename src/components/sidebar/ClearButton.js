import React from 'react';
import axios from 'axios'
import NotesService from '../../services/NotesService'

const ClearButton = ({ setNotes, setLines, socket }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = async () => NotesService.clearAll(setNotes, setLines, socket)


    return (
        <div className="sidebar-button" onClick={clear}>
            <img className="button-img" alt="clear" src="" />
        </div>
        
    )
};


export default ClearButton;