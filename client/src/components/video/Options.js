import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SocketContext } from '../../containers/SocketContext'

const Options = ({ children }) => {

  const {me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('')

  return (
    <div>
      <form noValidate autoComplete="off">
        <textarea label="name" value={name} onChange={(e) => setName(e.target.value)} />
        <CopyToClipboard text={me}>
          <button>copy your id</button>
        </CopyToClipboard>
      </form>
      <form noValidate autoComplete="off">
        <textarea label="make a call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? 
          (<button onClick={leaveCall}>hang up</button>) : (<button onClick={() => callUser(idToCall)}>call</button>)
        }
      </form>
      {children}
    </div>
  )
}

export default Options;