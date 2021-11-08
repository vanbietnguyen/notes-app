import React from 'react';


const EraserButton = ({changeTool}) => {

    return (
        <input value="eraser" type="submit" onClick={() => changeTool('eraser')}/>
    )
}

export default EraserButton;