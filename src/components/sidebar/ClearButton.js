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
        <img alt="clear" className="sidebar-button" value="clear" src="" onClick={clear} />
    )
};


export default ClearButton;