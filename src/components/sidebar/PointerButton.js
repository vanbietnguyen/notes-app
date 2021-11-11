import React from 'react';


const PenButton = ({changePointer}) => {

    return (
        <div className="sidebar-button" onClick={() => changePointer()}>
            <img className="button-img" alt="pointer" src="" />
        </div>
    )
}

export default PenButton;