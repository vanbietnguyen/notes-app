import React from 'react';


const NotesButton = ({openModal}) => {

    return (
        <img alt="add" className="sidebar-button" value="+" src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/round-add.png?raw=true" onClick={() => openModal()}/>
    )
}

export default NotesButton;