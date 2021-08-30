import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { actionColorChange } from '../redux/actions/metronome';
const click2Import = '/Click(2).mp3';
const click1Import = '/Click(1).mp3';


const click1 = new Audio(click1Import)
const click2 = new Audio(click2Import)
const MetronomeDiv = styled.div`
    width: 30em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .bpm-setter{
        display:flex;
        flex-direction:column;
    }
    
    button{
        display:flex;
        align-items: center;
        width: fit-content;
    }
    `

function Metronome() {
    const dispatch = useDispatch();
    const [playing, setPlaying] = useState(false);
    const [bpm, setbpm] = useState();
    const [count, setCount] = useState(0);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [bgColor, setBGColor] = useState();
    const bpmConvertTime = 60000 / bpm


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
            if(playing && count === 0){
                dispatch(actionColorChange('yellowgreen'))
            }else if (playing && count === 1){
                dispatch(actionColorChange("tomato"))
            } else if(playing && count === 2){
                dispatch(actionColorChange("pink"))
            } else if (playing && count === 3){
                dispatch(actionColorChange("green"))
            }
            if (count === beatsPerMeasure - 1) {
                setCount(0)
            }
        }, bpmConvertTime);
        return () => clearInterval(interval)
    }, [playing, bpmConvertTime, count, beatsPerMeasure, dispatch])

    function handleStartStop() {
        playing ? setPlaying(false) : setPlaying(true);
        if (playing){
            setBGColor('none')
        }
        console.log(playing)
    }

    return (
        <MetronomeDiv>
            <div className={`entirepage ${bgColor}`}>
                <div className="bpm-setter">
                    <div>{bpm} Beats Per Minute </div>
                    <input
                        onChange={(e) => setbpm(e.target.value)}
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
                <button onClick={handleStartStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        </MetronomeDiv>
    )
}

export default Metronome
