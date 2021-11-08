import React from 'react';


const ClearButton = ({ notes, setNotes }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = () => {
        setNotes([])
    }
    
    return (
        <input className="sidebar-button" value="clear" type="submit" onClick={clear} />
    )
};


export default ClearButton;