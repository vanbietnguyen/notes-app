import React, { useRef, useState } from 'react'
import VideoPlayer from '../components/video/VideoPlayer'
// import Sidebar from '../components/video/Sidebar'
import Notifications from '../components/video/Notifications'
import Sidebar from '../components/video/Sidebar'



const VideoContainer = () => {
  const [hidden, setHidden ] = useState(false)

  return (
    <>
    {hidden ? <button className="vid-collapse vid-button" onClick={() => setHidden(hidden => !hidden)}>show</button> : <button className="vid-collapse" onClick={() => setHidden(hidden => !hidden)}>hide</button>}
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