import React from 'react';


const NotesButton = ({openModal, changeClassName}) => {

    return (
        <div id="modal" className="sidebar-button" onClick={() => openModal()} >
            <img className="button-img" alt="add"  value="+" src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/sticky-note.png?raw=true" />
        </div>
        
    )
}

export default NotesButton;