const cartOverlay = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_CART_OVERLAY':
            return action.show
        default:
            return state
    }
}

export default cartOverlay
