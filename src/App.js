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
import store from './redux/store';




function App() {
  const animationToggle = useSelector(state => state.animation.isOn)
  const videoToggle = useSelector(state => state.video.isOn)
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
                    right: 6
                  }}
                  onPointerDown={startDrag}>🖐🏻</motion.div>
                <Metronome />
              </motion.div>
              {animationToggle ? <Animation tempo={120} constraintsRef={constraintsRef} /> : ''}
            </div>
          </Route>
          <Route exact path='/drums'>
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
                    right: 6
                  }}
                  onPointerDown={startDrag}>🖐🏻</motion.div>
                <Drums />
              </motion.div>
              <Video />
            </div>
          </Route>
        </Switch>
      </AppDiv>
    </Router>
  );
}
// let currentValue
// function handleChange() {
//   let previousValue = currentValue
//   currentValue = store.getState()
//   if (previousValue !== currentValue) {
//     return currentValue
//   } else {
//     return {
//       state: {
//         video: {
//           isOn: "none"
//         }
//       }
//     }
//   }
// }
// const state = store.subscribe(handleChange);
// state ? console.log(state) : console.log("")
// const videoToggle = state.video.isOn
const state = store.getState()
const playing = state.video.isOn
console.log(playing)
const AppDiv = styled.div`
  .contain{
    display: flex;
    justify-content:center;
    align-items: center;
    ${!playing ? 'width: 100vw; height: 100vh' : ""} 
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
