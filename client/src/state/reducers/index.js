import { combineReducers } from 'redux'
import cart from './cart'
import cartOverlay from './cartOverlay';
import screenWidth from './screenWidth';
import screenHeight from './screenHeight';
import isConsideredMobile from './isConsideredMobile';

export default combineReducers({
  cart,
  cartOverlay,
  screenWidth,
  screenHeight,
  isConsideredMobile,
})
