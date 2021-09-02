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
import About from './pages/About';




function App() {
  const animationToggle = useSelector(state => state.animation.isOn)
  const bpm = useSelector(state => state.tempo.tempo);
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()
  function startDrag(e) {
    dragControls.start(e)
  }
  const color = useSelector(state => state.metronome.color[0])
  return (
    <Router>
      <AppDiv className={`App`}>
        <div className={color}>
          <Switch>
            <Route exact path='/'>
              <div
                ref={constraintsRef}
                className={`contain `}>
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
                <div className={`copyright`}>
                  <span>© 2021 Hayden Gregory All Rights Reserved. || | </span>
                  <span>| Designed by Hayden Gregory</span>
                </div>
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
                <div className={`copyright`}>
                  <span>© 2021 Hayden Gregory All Rights Reserved. || | </span>
                  <span>| Designed by Hayden Gregory</span>
                </div>
              </div>
            </Route>
            <Route exact path='/ye'>
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
                  <About />
                </motion.div>
                <div className={`copyright`}>
                  <span>© 2021 Hayden Gregory All Rights Reserved. || | </span>
                  <span>| Designed by Hayden Gregory</span>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </AppDiv>
    </Router>
  );
}
const AppDiv = styled.div`

      display: flex;
      flex-direction: column;

  .contain{
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      width: 100vw;
      height: 100vh
  }

  .copyright{
    display: flex;
    position:absolute;
    bottom: 0;
    right: 0;
    justify-content: flex-end;
    font-size:10px;
    border: none;
    border-style:none;
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
