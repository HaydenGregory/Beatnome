import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Metronome from './components/Metronome';
import { Animation } from './components/Animation';
import { motion, useDragControls } from 'framer-motion';
import { useRef } from 'react';
import './App.css';




function App() {
  const animationToggle = useSelector(state => state.animation.isOn)
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()
  function startDrag(e){
    dragControls.start(e)
  }
  const color = useSelector(state => state.metronome.color[0])
  console.log(color)
  return (
    <AppDiv className="App">
      <div 
        ref={constraintsRef} 
        className={`contain ${color}`}>
          <motion.div 
            style={{
              position:'relative'
            }}
            drag 
            dragControls={dragControls} 
            dragListener={false}
            dragConstraints={constraintsRef}>
              <motion.div
                style={{
                  position: 'absolute',
                  right: 6
                }}
              onPointerDown={startDrag}>🖐🏻</motion.div>
            <Metronome />
          </motion.div>
          {animationToggle ? <Animation tempo={60} constraintsRef={constraintsRef}/> : ''}
        
      </div>
    </AppDiv>
  );
}
const AppDiv = styled.div`
  .contain{
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  
  .pink{
    background-color: pink;
  }
  .yellowgreen{
    background-color: yellowgreen;
  }
  .green{
    background-color: green;
  }
  .tomato{
    background-color: tomato;
  }


  `

export default App;
