import React from 'react';


const EraserButton = ({changeTool}) => {

    return (
        <input className="sidebar-button" value="eraser" type="submit" onClick={() => changeTool('eraser')}/>
    )
}

export default EraserButton;