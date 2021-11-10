import React from 'react';


const PenButton = ({changePointer}) => {

    return (
        <input className="sidebar-button" value="pointer" type="submit" onClick={() => changePointer()}/>
    )
}

export default PenButton;