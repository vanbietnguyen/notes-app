import React from 'react';
import axios from 'axios'


const ClearButton = ({ setNotes, setLines }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = async () => {
        setLines([])
        setNotes([])
        await axios.post('api/notes/clear', {here: 'here'})
    }
    
    return (
        <input className="sidebar-button" value="clear" type="submit" onClick={clear} />
    )
};


export default ClearButton;