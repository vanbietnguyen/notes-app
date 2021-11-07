import React from 'react';


const NotesButton = ({openModal}) => {

    return (
        <input value="+" type="submit" onClick={() => openModal()}/>
    )
}

export default NotesButton;