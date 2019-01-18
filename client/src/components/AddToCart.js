import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addToCart } from '../state/actions'
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
});

const addItemToCart = (dispatch, cartItem) => {
    console.log('cartItem',cartItem);
    if (cartItem.images && (cartItem.images.constructor === Array) && (cartItem.images[0] && cartItem.images[0].url)) {
        cartItem.image = cartItem.images[0].url
    }
    if(cartItem) {
        dispatch(addToCart(cartItem));
    }else{
        return null;
    }
}

const AddToCart = ({ dispatch, classes, cartItem }) => {
  return (
        <Fab variant="extended" onClick={() => { addItemToCart(dispatch, cartItem) }} color="primary" aria-label="Add To Cart" className={classes.fab}>
            <AddShoppingCartIcon className={classes.extendedIcon} />Add To Cart
        </Fab>
  )
}

AddToCart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  

export default connect()(withStyles(styles, { withTheme: true })(AddToCart));
