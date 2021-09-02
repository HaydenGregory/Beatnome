import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { actionColorChange } from '../redux/actions/metronome';
import { actionToggleOn, actionToggleOff } from '../redux/actions/animation';
import { actionToggleOff as actionStop, actionToggleOn as actionStart } from '../redux/actions/video';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { actionChangeTempo } from '../redux/actions/tempo';
// var tapTempo = require('tap-tempo')

const click2Import = '/Click(2).mp3';
const click1Import = '/Click(1).mp3';
const click1 = new Audio(click1Import)
const click2 = new Audio(click2Import)

//! CSS
const MetronomeDiv = styled.div`
    width: 30em;
    max-width:90vw;
    z-index: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    border-radius: 3%;
    box-shadow: 10px 5px 10px black;
    padding: 3%;
    background-color: rgba(255, 255, 255, .7);
    backdrop-filter: blur(5px);

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

    .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 23px;
}   

.switch input { 
    opacity: 0;
    width: 0;
    height: 0;
}   

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 2.8px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    -webkit-transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

    .toggle_switches{
        margin-top: 3%;
        display: flex;
        justify-content: space-evenly;
    }

    .bpm-setter{
        display:flex;
        flex-direction:column;
    }
    
    .buttons_div{
        display: flex;
        justify-content: space-evenly;    
    }

    .start_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin: auto;
        margin-top: 3%;
    }
    .drum_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin-top: 3%;
    }
    .ye_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin-top: 3%;
    }
    `

function Metronome() {
    const dispatch = useDispatch();
    const animationToggle = useSelector(state => state.animation.isOn)
    const bpm = useSelector(state => state.tempo.tempo);
    const playing = useSelector(state => state.video.isOn)
    const [count, setCount] = useState(0);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [colorIsOn, setColorIsOn] = useState(true);

    const bpmConvertTime = 60000 / bpm;


    console.log(bpmConvertTime)
    useEffect(() => {
        const interval = setInterval(() => {
            if (playing && count === 0) {
                click1.play()
                setCount(count + 1)
            } else if (playing) {
                click2.play()
                setCount(count + 1)
            }
            if (playing && colorIsOn && (count === 0 || count === 4)) {
                dispatch(actionColorChange('yellowgreen'))
            } else if (playing && colorIsOn && (count === 1 || count === 5)) {
                dispatch(actionColorChange("tomato"))
            } else if (playing && colorIsOn && (count === 2 || count === 6)) {
                dispatch(actionColorChange("pink"))
            } else if (playing && colorIsOn && (count === 3 || count === 7)) {
                dispatch(actionColorChange("green"))
            }
            if (count === beatsPerMeasure - 1) {
                setCount(0)
            }
        }, bpmConvertTime);
        return () => clearInterval(interval)
    }, [playing, bpmConvertTime, count, beatsPerMeasure, colorIsOn, dispatch])

    function handleStartStop() {
        setCount(0)
        if (playing) {
            dispatch(actionStop())
            dispatch(actionColorChange('none'))
        } else { dispatch(actionStart()) }
    }

    const toggleColorSwitch = () => setColorIsOn(!colorIsOn);

    function toggleAnimatedBoxSwitch() {
        if (animationToggle === true) {
            dispatch(actionToggleOff())
        } else { dispatch(actionToggleOn()) }
    }

    return (
        <MetronomeDiv>
            <div className="bpm-setter" onMouseDown={(e) => { e.stopPropagation() }}>
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
                <select onChange={(e) => setBeatsPerMeasure(e.target.value)}>
                    <option value={4}>4/4</option>
                    <option value={6}>6/8</option>
                    <option value={3}>3/4</option>
                </select>
                <div className="toggle_switches">
                    <span>Color</span>
                    <label class="switch">
                        <input type="checkbox" checked={colorIsOn} onClick={toggleColorSwitch} />
                        <span class="slider round"></span>
                    </label>
                    <span>Animated Box</span>
                    <label class="switch">
                        <input type="checkbox"  onClick={toggleAnimatedBoxSwitch} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div className='buttons_div'>
                <Button action as={Link} to={'/ye'} className="ye_button" variant="outline-warning">Ye</Button>
                <Button className='start_button' variant="outline-info" onClick={handleStartStop}>{playing ? 'Stop' : 'Start'}</Button>
                <Button action as={Link} to={'/drums'} className="drum_button" variant="outline-warning">Drums</Button>
            </div>
        </MetronomeDiv>
    )
}

export default Metronome
