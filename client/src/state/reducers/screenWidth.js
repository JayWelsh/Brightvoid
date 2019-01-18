const screenWidth = (state = window.innerWidth, action) => {
    switch (action.type) {
        case 'SET_WIDTH':
            return action.width
        default:
            return state
    }
}

export default screenWidth;