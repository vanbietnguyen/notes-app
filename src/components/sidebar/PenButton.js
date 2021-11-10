import React from 'react';


const PenButton = ({changeTool}) => {

    return (
        <input className="sidebar-button" value="pen" type="submit" onClick={() => changeTool('pen')}/>
    )
}

export default PenButton;