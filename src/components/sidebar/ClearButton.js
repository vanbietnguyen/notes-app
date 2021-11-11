import React from 'react';
import axios from 'axios'
import NotesService from '../../services/NotesService'

const ClearButton = ({ setNotes, setLines, socket }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = async () => {
        setLines([])
        setNotes([])
        socket.emit("clearAll")
        await axios.post('api/notes/clear', {here: 'here'})
    }
    
    return (
        <div className="sidebar-button" onClick={clear}>
            <img className="button-img" alt="clear" src="" />
        </div>
        
    )
};


export default ClearButton;