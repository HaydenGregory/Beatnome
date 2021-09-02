const defaultState = {
    quote: ''
}

function kanye(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_QUOTE':
            return {
                ...state,
                quote: action.quote
            }
        default:
            return state
    }
}

export default kanye;