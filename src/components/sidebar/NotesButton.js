import React from 'react';


const NotesButton = ({openModal}) => {

    return (
        <input className="sidebar-button" value="+" type="submit" onClick={() => openModal()}/>
    )
}

export default NotesButton;