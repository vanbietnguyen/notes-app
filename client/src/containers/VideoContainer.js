import React, { useRef, useState } from 'react'
import VideoPlayer from '../components/video/VideoPlayer'
import { Button } from '@material-ui/core';
import Notifications from '../components/video/Notifications'
import Sidebar from '../components/video/Sidebar'



const VideoContainer = () => {
  const [hidden, setHidden ] = useState(false)

  return (
    <>
    {hidden ? <Button className="vid-collapse vid-button" onClick={() => setHidden(hidden => !hidden)}>show</Button> : <Button className="vid-collapse" onClick={() => setHidden(hidden => !hidden)}>hide</Button>}
      <div className={hidden ? "video-modal hidden" : "video-modal"}>
        
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </>
    
  )
}

export default VideoContainer;