import { createStore } from 'redux';
import metronome from './reducers/metronome';

const store = createStore(
    metronome,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;