import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';



const VideoDiv = styled.div`
    z-index:0;
    position: fixed;
    right: 0;
    bottom: 0;
    width:100vw;
    height:100vh;
`

function Video() {
    const playing = useSelector(state => state.video.isOn)
    if(playing){return (
        <VideoDiv>
            <video loop controls>
                <source src='100bpmDrumVideo.mp4' type='video/mp4' />
            </video>
        </VideoDiv>
    )} else {return ""} 
}

export default Video
