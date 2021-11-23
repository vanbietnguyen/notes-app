import React, { useContext } from 'react';
import NotesService from '../../services/NotesService'
import { SocketContext } from '../../containers/SocketContext'

const ClearButton = ({ setNotes, setLines }) => {
    const { socket } = useContext(SocketContext)

    const clear = async () => NotesService.clearAll(setNotes, setLines, socket)

    return (
        <div className="sidebar-button" onClick={clear}>
            <img className="button-img" alt="clear" src="https://github.com/vanbietnguyen/notes-app/blob/dev/.github/deleteall.png?raw=true" />
        </div>
        
    )
};


export default ClearButton;