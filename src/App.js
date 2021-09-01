import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Metronome from './pages/Metronome';
import Drums from './pages/Drums';
import { Animation } from './components/Animation';
import { motion, useDragControls } from 'framer-motion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useRef } from 'react';
import './App.css';
import Video from './components/Video';




function App() {
  const animationToggle = useSelector(state => state.animation.isOn)
  const bpm = useSelector(state => state.tempo.tempo);
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()
  function startDrag(e) {
    dragControls.start(e)
  }
  const color = useSelector(state => state.metronome.color[0])
  console.log(color)
  return (
    <Router>
      <AppDiv className="App">
        <Switch>
          <Route exact path='/'>
            <div
              ref={constraintsRef}
              className={`contain ${color}`}>
              <motion.div
                style={{
                  position: 'relative'
                }}
                drag
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={constraintsRef}>
                <motion.div
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    right: 6
                  }}
                  onPointerDown={startDrag}>🖐🏻</motion.div>
                <Metronome />
              </motion.div>
              {animationToggle ? <Animation tempo={bpm} constraintsRef={constraintsRef} /> : ''}
            </div>
          </Route>
          <Route exact path='/drums'>
            <Video />
            <div
              ref={constraintsRef}
              className={`contain ${color}`}>
              <motion.div
                style={{
                  position: 'relative',
                }}
                drag
                layout
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={constraintsRef}>
                <motion.div
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    right: 6
                  }}
                  onPointerDown={startDrag}>🖐🏻</motion.div>
                <Drums />
              </motion.div>
            </div>
          </Route>
        </Switch>
      </AppDiv>
    </Router>
  );
}
const AppDiv = styled.div`
  .contain{
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100vw; 
    height: 100vh
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
