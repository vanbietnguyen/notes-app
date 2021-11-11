import React from 'react';


const PenButton = ({changeTool}) => {

    return (
        <div className="sidebar-button" onClick={() => changeTool('pen')}>
            <img className="button-img" alt="pen" src="" />
        </div>
    )
}

export default PenButton;