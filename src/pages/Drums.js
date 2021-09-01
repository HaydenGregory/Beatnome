import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { actionToggleOff, actionToggleOn } from '../redux/actions/video';



const DrumsDiv = styled.div`
    z-index: 1;
    width: 30em;
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
        align-items: center;
        width: fit-content;
        margin: auto;
        margin-left: 42%;
        margin-top: 3%;
    }
    .drum_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin-top: 3%;
    }
`

function Drums() {
    const playing = useSelector(state => state.video.isOn);
    const [bpm, setbpm] = useState(100);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const dispatch = useDispatch()


    function handleStartStop() {
        playing ? dispatch(actionToggleOff()) : dispatch(actionToggleOn())
    }



    return (
        <DrumsDiv>
            <div className="bpm-setter">
                <div>{bpm} Beats Per Minute </div>
                <input
                    onChange={(e) => setbpm(e.target.value)}
                    className='range'
                    type="range"
                    min="50"
                    max="230"
                    value={bpm} />
                <label name="Tempo">Tempo</label>
                <input
                    name="Tempo"
                    onChange={(e) => setbpm(e.target.value)}
                    type="number"
                    min="50"
                    max="230"
                    value={bpm} />
                <label>Time Signature</label>
                <select onChange={(e) => setBeatsPerMeasure(e.target.value)}>
                    <option value={4}>4/4</option>
                    <option value={6}>6/8</option>
                    <option value={3}>3/4</option>
                </select>
            </div>
            <div className='buttons_div'>
                <Button className='start_button' variant="outline-info" onClick={handleStartStop}>{playing ? 'Stop' : 'Start'}</Button>
                <Button action as={Link} to={'/'} className="drum_button" variant="outline-warning">Metronome</Button>
            </div>
        </DrumsDiv>
    )
}

export default Drums
