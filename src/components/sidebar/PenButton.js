import React from 'react';


const PenButton = ({changeTool}) => {

    return (
        <input value="pen" type="submit" onClick={() => changeTool('pen')}/>
    )
}

export default PenButton;