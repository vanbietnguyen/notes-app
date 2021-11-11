import React from 'react';
import NotesService from '../../services/NotesService'

const ClearButton = ({ setNotes, setLines, socket }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = async () => NotesService.clearAll(setNotes, setLines, socket)


    return (
        <div className="sidebar-button" onClick={clear}>
            <img className="button-img" alt="clear" src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/deleteall.png?raw=true" />
        </div>
        
    )
};


export default ClearButton;