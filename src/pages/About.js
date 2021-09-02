import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { actionUpdateQuote } from '../redux/actions/kanye';
import { actionChangeSignature } from '../redux/actions/signature';
import { actionChangeTempo } from '../redux/actions/tempo';
import { actionToggleOff, actionToggleOn } from '../redux/actions/video';


const AboutDiv = styled.div`
    z-index: 1;
    width: 30em;
    background-color: rgba(255, 255, 255, .7);
    backdrop-filter: blur(5px);
    display: flex;
    bottom: 30;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    border-radius: 3%;
    box-shadow: 10px 5px 10px black;
    padding: 3%;

    .buttons_div{
        display: flex;
        justify-content: space-evenly
    }

    .start_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin-top: 3%;
    }
    .drum_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }
    .play_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }
    .ye_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }

    span{
        padding: 5%;
    }
`

function About() {
    const dispatch = useDispatch();
    const quote = useSelector(state => state.kanye.quote);
    const playing = useSelector(state => state.video.isOn);
    const signature = useSelector(state => state.timeSignature.signature)


    function handleFetch() {
        fetch('https://api.kanye.rest').then(res => res.json()).then(data => {
            dispatch(actionUpdateQuote(data.quote))
        })
    }

    function handleStartStop() {
        if (playing) {
            dispatch(actionToggleOff())
            // dispatch(actionChangeSignature('4/4'))    
        } else {
            dispatch(actionToggleOn())
            if (signature === '4/4' || signature === 'kanye4' || signature === '6/8' || signature === '3/4') {
                dispatch(actionChangeTempo(100))
                dispatch(actionChangeSignature('kanye'))
            } else if (signature === 'kanye') {
                dispatch(actionChangeSignature('kanye2'))
            } else if (signature === 'kanye2') {
                dispatch(actionChangeSignature('kanye3'))
            } else if (signature === 'kanye3') {
                dispatch(actionChangeSignature('kanye4'))
            }
        }
    }


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Start and stop to change songs!
        </Tooltip>
    );

    return (
        <AboutDiv>
            {quote ? <h5>Kanye once said: </h5> : ''}
            <span>{quote}</span>
            <div className="buttons_div">
                <Button action as={Link} to={'/'} className="drum_button" variant="outline-warning">Metronome</Button>
                <Button className='start_button' variant="outline-info" onClick={handleFetch}>{quote ? "Get New Quote" : "Get Quote"}</Button>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}>
                    <Button className="play_button" variant="outline-dark" onClick={handleStartStop}>{playing ? 'Stop' : 'Start'}</Button>
                </OverlayTrigger>
                <Button action as={Link} to={'/drums'} className="drum_button" variant="outline-warning">Drums</Button>
            </div>
        </AboutDiv>
    )
}

export default About
