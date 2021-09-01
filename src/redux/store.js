import { combineReducers, createStore } from 'redux'
import metronome from './reducers/metronome';
import animation from './reducers/animation';
import video from './reducers/video';

const rootReducer = combineReducers({
    metronome:metronome,
    animation: animation,
    video: video,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;