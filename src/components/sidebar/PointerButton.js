import React from 'react';


const PenButton = ({changePointer}) => {

    return (
        <input value="pointer" type="submit" onClick={() => changePointer()}/>
    )
}

export default PenButton;