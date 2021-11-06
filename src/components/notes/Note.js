import React from 'react';


const Note = ({ text }) => {

    // define delete and put methods here

    return (
        <div className="note" >
            {text}
        </div>
    )
}

export default Note;