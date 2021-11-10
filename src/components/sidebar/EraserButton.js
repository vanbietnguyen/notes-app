import React from 'react';


const EraserButton = ({changeTool}) => {

    return (
        <div className="sidebar-button" onClick={() => changeTool('eraser')}>
            <img className="button-img" alt="eraser" src="" />
        </div>
    )
}

export default EraserButton;