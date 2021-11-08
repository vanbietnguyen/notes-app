import React from 'react';


const ClearButton = ({ setNotes, setLines }) => {
    // clear canvas by retrieving entire notes array and setting it to {}
    const clear = () => {
        setLines([])
        setNotes([])
    }
    
    return (
        <input className="sidebar-button" value="clear" type="submit" onClick={clear} />
    )
};


export default ClearButton;