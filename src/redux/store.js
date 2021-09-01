import { combineReducers, createStore } from 'redux'
import metronome from './reducers/metronome';
import animation from './reducers/animation';
import video from './reducers/video';
import tempo from './reducers/tempo';
import timeSignature from './reducers/signature';

const rootReducer = combineReducers({
    metronome,
    animation,
    video,
    tempo,
    timeSignature
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;