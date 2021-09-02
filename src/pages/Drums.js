import React, { useEffect } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { actionChangeTempo } from '../redux/actions/tempo';
import { actionChangeSignature } from '../redux/actions/signature';
import { actionToggleOff, actionToggleOn } from '../redux/actions/video';
import { actionColorChange } from '../redux/actions/metronome';



const DrumsDiv = styled.div`
    z-index: 1;
    max-width:90vw;
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

    .bpm-setter{
        display:flex;
        flex-direction:column;
    }
    
    .buttons_div{
        display: flex;
        justify-content: space-evenly;
    }

    .ye_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }

    input{
        text-align:center;
        border:none;
        background-color: rgba(255, 255, 255, 0.2)
    }

    select{
        text-align:center;
        border:none;
        background-color: rgba(255, 255, 255, 0.2)
    }

    option{
        text-align:center;
    }

    .start_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }
    .drum_button{
        display:flex;
        width: fit-content;
        margin-top: 3%;
    }
`

function Drums() {
    const playing = useSelector(state => state.video.isOn);
    const bpm = useSelector(state => state.tempo.tempo);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionChangeSignature('4/4'))
        dispatch(actionToggleOff())
        dispatch(actionColorChange(''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleStartStop() {
        playing ? dispatch(actionToggleOff()) : dispatch(actionToggleOn())
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Start and stop to change time signatures
        </Tooltip>
    );

    return (
        <DrumsDiv>
            <div className="bpm-setter">
                <div>{bpm} Beats Per Minute </div>
                <input
                    onChange={(e) => dispatch(actionChangeTempo(e.target.value))}
                    className='range'
                    type="range"
                    min="50"
                    max="230"
                    value={bpm} />
                <label name="Tempo">Tempo</label>
                <input
                    name="Tempo"
                    onChange={(e) => dispatch(actionChangeTempo(e.target.value))}
                    type="number"
                    min="50"
                    max="230"
                    value={bpm} />
                <label>Time Signature</label>
                <select onChange={(e) => dispatch(actionChangeSignature(e.target.value))}>
                    <option value={"4/4"}>4/4</option>
                    <option value={"6/8"}>6/8</option>
                    <option value={"3/4"}>3/4</option>
                </select>
            </div>
            <div className='buttons_div'>
                <Button action as={Link} to={'/ye'} className="ye_button" variant="outline-warning">Ye</Button>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}>
                    <Button className='start_button' variant="outline-info" onClick={handleStartStop}>{playing ? 'Stop' : 'Start'}</Button>
                </OverlayTrigger>
                <Button action as={Link} to={'/'} className="drum_button" variant="outline-warning">Metronome</Button>
            </div>
        </DrumsDiv>
    )
}

export default Drums
