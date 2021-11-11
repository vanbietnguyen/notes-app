import React, { useRef } from 'react';


const PenButton = ({ changeTool, changeClassName }) => {
    const penRef = useRef(false)
   

    return (
        <div 
            id="pen" 
            ref={penRef} 
            className="sidebar-button"
            onClick={() => {
                changeTool('pen')
                changeClassName(penRef.current)
            }}
        >
            <img 
                className="button-img" 
                alt="pen" 
                src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/pen.png?raw=true" 
            />
        </div>
    )
}

export default PenButton;