import React from 'react';

const Note = ({ text, id, color, deleteNote, dropNote, top, left }) => {


	return (
		<div style={{backgroundColor: color, zIndex:998, top: `${top}px`, left: `${left}px`}} id={id} className="note" onDragEnd={dropNote} draggable="true">
			<img onClick={() => deleteNote(id)}
				className="edit-button" 
				alt="edit" 
				src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/cursor-png-1108.png?raw=true" 
			/>
			<pre className="text">{text}</pre>
		</div>
	)
}

export default Note;