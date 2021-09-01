const defaultState = {
    isOn: false
}

function video(state = defaultState, action) {
    switch (action.type) {
        case 'TOGGLE_ON':
            return {
                ...state,
                isOn: true
            }
        case 'TOGGLE_OFF':
            return{
                ...state,
                isOn: false
            }
        default:
            return state
    }
}

export default video;