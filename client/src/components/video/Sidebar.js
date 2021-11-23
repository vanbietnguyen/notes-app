import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, TextField } from '@material-ui/core';

import { SocketContext } from '../../containers/SocketContext';

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  return (
    <div >

      <form  noValidate autoComplete="off">
            <p>Account Info</p>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <CopyToClipboard text={me}>
              <Button className="vid-button" variant="contained" color="primary" fullWidth>
              copy id
              </Button>
              </CopyToClipboard>
            <p>Make a call</p>

            <TextField label="ID to call" value={idToCall} id="note-text-area" onChange={(e) => setIdToCall(e.target.value)} fullWidth />
            {callAccepted && !callEnded ? (
                <Button className="vid-button" variant="contained" color="secondary" onClick={leaveCall} >
                Hang Up
                </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => callUser(idToCall)} >
              Call
              </Button>
            )}
      </form>
      {children}
    </div>
  );
};

export default Sidebar;


