import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';



const VideoDiv = styled.div`
    z-index:0;
    position: absolute;
    right: 0;
    bottom: 0;
    width:100vw;
    height:100vh;
`

function Video() {
    const signature = useSelector(state => state.timeSignature.signature)
    const tempo = useSelector(state => state.tempo.tempo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const video = useCallback((node)=>{
        if(!!node){
            node.playbackRate = tempo / 100
        }
    })
    const playing = useSelector(state => state.video.isOn)
    if(playing){return (
        <VideoDiv>
            <video loop ref={video} autoPlay style={{
                objectFit: "cover",
                width: "100vw",
                height: "100vh",
            }}>
                {signature === "kanye" && <source src='bound2.mp4' type='video/mp4' />}
                {signature === "kanye2" && <source src='runaway.mp4' type='video/mp4' />}
                {signature === "kanye3" && <source src='canttellme.mp4' type='video/mp4' />}
                {signature === "kanye4" && <source src='blackskinhead.mp4' type='video/mp4' />}
                {signature === "4/4" && <source src='100bpmDrumVideo.mp4' type='video/mp4' />}
                {signature === "6/8" && <source src='68DrumVideo.mp4' type='video/mp4' />}
                {signature === "3/4" && <source src='34DrumVideo.mp4' type='video/mp4' />}
            </video>
        </VideoDiv>
    )} else {return ""} 
}

export default Video
