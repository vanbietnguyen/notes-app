import React from 'react';

const Note = ({ text, id, color, deleteNote, dropNote, top, left }) => {


	return (
		<div style={{backgroundColor: color, zIndex:998, top: `${top}px`, left: `${left}px`}} id={id} className="note" onDragEnd={dropNote} draggable="true">
			<button onClick={() => deleteNote(id)}>delete</button>
			<pre className="text">{text}</pre>
		</div>
	)
}

export default Note;