import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Metronome from './components/Metronome';

const AppDiv = styled.div`
.container{
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;
  height: 100%
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
display: flex;
height: 100vh;
text-align: center;
padding-top: 3%;
align-items: center;
justify-content: center;
`

function App() {
  const color = useSelector(state => state.color[0])
  console.log(color)
  return (
    <AppDiv className="App">
      <div className={`container ${color}`}>
        <Metronome />
      </div>
    </AppDiv>
  );
}

export default App;
