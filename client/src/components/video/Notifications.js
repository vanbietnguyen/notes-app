import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { SocketContext } from './SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <p>{call.name} is calling:</p>
          <Button className="vid-button" variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;