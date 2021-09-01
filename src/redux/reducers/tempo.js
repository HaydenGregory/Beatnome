const defaultState = {
    tempo: 100
}

function tempo(state = defaultState, action) {
    switch (action.type) {
        case 'CHANGE_TEMPO':
            return {
                ...state,
                tempo: action.tempo
            }
        default:
            return state
    }
}

export default tempo;