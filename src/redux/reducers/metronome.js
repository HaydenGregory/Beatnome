const defaultState = {
    color: "white"
}

function metronome(state = defaultState, action) {
    switch (action.type) {
        case 'CHANGE_BACKGROUND':
            return {
                ...state,
                color: [action.color]
            }
        default:
            return state
    }
}

export default metronome;