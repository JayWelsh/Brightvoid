const cart = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        //Check if item already exists, if so, increment quantity count
        for(const cartItem of state){
          if(cartItem._id === action.cartItem._id){
            cartItem.quantity++;
            return [
              ...state
            ]
          }
        }
        return [
          ...state,
          action.cartItem
        ]
      case 'REMOVE_FROM_CART':
        //Check if item already exists, if so, increment quantity count
        for(let i = 0; i < state.length; i++){
          let cartItem = state[i];
          if(cartItem._id === action.cartItem._id){
            if (cartItem.quantity > 1) {
              cartItem.quantity--;
              return [
                ...state
              ]
            } else {
              state = state.filter((item) => {
                return item._id !== action.cartItem._id;
              });
              return [
                ...state
              ]
            }
          }
        }
        return [
          ...state,
          action.cartItem
        ]
      default:
        return state
    }
  }
  
  export default cart
  