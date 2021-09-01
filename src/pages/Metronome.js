import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { actionColorChange } from '../redux/actions/metronome';
import { actionToggleOn, actionToggleOff } from '../redux/actions/animation';
import { actionToggleOff as actionStop, actionToggleOn as actionStart } from '../redux/actions/video';

import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
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
        background-color: rgba(255, 255, 255, 0.4);
        display: flex;
        justify-content: flex-start;
        border-radius: 50px;
        padding: 1%;
        padding-bottom: 2%;
        cursor: pointer;
        width: 3em;
        height: 1.5em;
    }

    .switch[data-isOn="true"] {
        justify-content: flex-end;
        width: 3em;
        height: 1.5em;
    }

    .handle {
        background-color: white;
        border-radius: 40px;
        width: 1em;
        height: 1em;
        position: relative;
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
    }

    .start_button{
        display:flex;
        align-items: center;
        width: fit-content;
        margin: auto;
        margin-left: 45%;
        margin-top: 3%;
    }
    .drum_button{
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
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };


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
        } else { dispatch(actionStart())}
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
                    <div className="switch" data-isOn={colorIsOn} onClick={toggleColorSwitch}>
                        <motion.div className="handle" layout transition={spring} />
                    </div>
                    <span>Animated Box</span>
                    <div className="switch" data-isOn={animationToggle} onClick={toggleAnimatedBoxSwitch}>
                        <motion.div className="handle" layout transition={spring} />
                    </div>
                </div>
            </div>
            <div className='buttons_div'>
                <Button className='start_button' variant="outline-info" onClick={handleStartStop}>{playing ? 'Stop' : 'Start'}</Button>
                <Button action as={Link} to={'/drums'} className="drum_button" variant="outline-warning">Drums</Button>
            </div>
        </MetronomeDiv>
    )
}

export default Metronome
