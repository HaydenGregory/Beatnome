const defaultState = {
    signature: "4/4"
}

function timeSignature(state = defaultState, action) {
    switch (action.type) {
        case 'CHANGE_SIGNATURE':
            return {
                ...state,
                signature: action.signature
            }
        default:
            return state
    }
}

export default timeSignature;