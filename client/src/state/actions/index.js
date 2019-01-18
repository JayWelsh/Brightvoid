export const addToCart = cartItem => ({
    type: 'ADD_TO_CART',
    cartItem
})

export const removeFromCart = cartItem => ({
    type: 'REMOVE_FROM_CART',
    cartItem
})

export const showCartOverlay = show => ({
    type: 'SHOW_CART_OVERLAY',
    show
})

export const setScreenHeight = height => ({
    type: 'SET_HEIGHT',
    height
});

export const setScreenWidth = width => ({
    type: 'SET_WIDTH',
    width
});