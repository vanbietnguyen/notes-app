import React from 'react';


const Note = ({ text, id, color, deleteNote, dropNote }) => {


    return (
        <div style={{backgroundColor: color}} id={id} className="note" onDragEnd={dropNote} draggable="true">
            <button onClick={() => deleteNote(id)}>delete</button>
            <pre className="text">{text}</pre>
        </div>
    )
}

export default Note;