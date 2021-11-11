import React, { useRef } from 'react';


const EraserButton = ({changeTool, changeClassName}) => {
    const eraserRef = useRef(false)

    return (
        <div id="eraser" 
            ref={eraserRef}
            className="sidebar-button" 
            onClick={() => {
                changeClassName(eraserRef.current)
                changeTool('eraser')
            }}>
            <img 
                
                className="button-img" 
                alt="eraser" 
                src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/eraser.png?raw=true" 
            />
        </div>
    )
}

export default EraserButton;