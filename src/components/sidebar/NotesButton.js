import React from 'react';


const NotesButton = ({openModal}) => {

    return (
        <div className="sidebar-button" onClick={() => openModal()}>
            <img className="button-img" alt="add"  value="+" src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/sticky-note.png?raw=true" />
        </div>
        
    )
}

export default NotesButton;