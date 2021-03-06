import React, { useRef } from 'react';


const PointerButton = ({changePointer, changeClassName, pointerClass }) => {

    const pointerRef = useRef(false)

    return (
        <div id="pointer"
            ref={pointerRef}
            className={pointerClass}
            onClick={() => {
                changePointer()
                changeClassName(pointerRef.current)
            }}
        >
            <img 
                className="button-img" 
                alt="pointer" 
                src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/cursor-png-1108.png?raw=true" 
            />
        </div>
    )
}

export default PointerButton;