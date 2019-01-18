const screenHeight = (state = window.innerHeight, action) => {
    switch (action.type) {
        case 'SET_HEIGHT':
            return action.height
        default:
            return state
    }
}

export default screenHeight;