import { combineReducers, createStore } from 'redux'
import metronome from './reducers/metronome';
import animation from './reducers/animation';

const rootReducer = combineReducers({
    metronome:metronome,
    animation: animation
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;