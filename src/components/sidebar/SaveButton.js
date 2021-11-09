import React from 'react';
import Service from '../../services/services'

const SaveButton = ({lines, notes}) => {
  
    return (
        <input value="save" type="submit" onClick={() => Service.save(lines, notes)}/>
    )
}

export default SaveButton;