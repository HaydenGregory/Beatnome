const defaultState = {
    isOn: false
}

function video(state = defaultState, action) {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                isOn: true
            }
        case 'STOP':
            return{
                ...state,
                isOn: false
            }
        default:
            return state
    }
}

export default video;