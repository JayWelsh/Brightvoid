import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import OurEnhancedTable from './OurEnhancedTable';
import {Link} from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import store from '../state';
import { connect } from 'react-redux';
import { showCartOverlay } from '../state/actions';

console.log('store',store);

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    emptyCartHeading: {
        padding: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    badge: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        marginLeft: theme.spacing.unit,
    },
});

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: 'md',
            cartItems: []
        }
        store.subscribe(() => {
            this.setState({
                cartItems: store.getState().cart,
                open: store.getState().cartOverlay,
            });
        });
    }

  handleClickOpen = () => {
    this.props.dispatch(showCartOverlay(true));
  };

  handleClose = () => {
    this.props.dispatch(showCartOverlay(false));
  };

  render() {
    const { classes } = this.props;
    const { cartItems, open } = this.state;
    let cartItemCount = 0;
    let cartTotal = 0;

    console.log('cartOverlay',open);
    
    for(const cartItem of cartItems) {
        const cartItemQuantity = cartItem.quantity;
        cartItemCount += cartItemQuantity;
        cartTotal += cartItem.price * cartItemQuantity;
    }

    console.log('cartItems',cartItems);

    let cartNotEmpty = false;
    if(cartItems && (cartItems.length > 0)){
        cartNotEmpty = true;
    }
    
    const desiredTableColumns = [
        {columnKey: 'image', columnType: 'img', numeric: false, disablePadding: true, label: 'Image', displayOrder: 0},
        {columnKey: 'name', columnType: 'text', numeric: false, disablePadding: true, label: 'Product Name', displayOrder: 1},
        {columnKey: 'colour', columnType: 'text', numeric: false, disablePadding: true, label: 'Color', displayOrder: 2},
        {columnKey: 'size', columnType: 'text', numeric: false, disablePadding: true, label: 'Size', displayOrder: 3},
        {columnKey: 'quantity', columnType: 'text', numeric: false, disablePadding: true, label: 'Quantity', displayOrder: 4},
        {columnKey: 'price', columnType: 'price', numeric: false, disablePadding: true, label: 'Price', displayOrder: 5},
        {columnKey: 'actions', columnType: 'component', numeric: false, disablePadding: true, label: 'Actions', displayOrder: 6, onClick: this.handleClose},
    ];

    return (
      <React.Fragment>
            <Button onClick={this.handleClickOpen} color="default" className={classes.button}>
                <ShoppingCartIcon className={classes.leftIcon} />Cart<Badge color="secondary" badgeContent={cartItemCount} className={classes.margin} classes={{ badge: classes.badge }}><span></span></Badge>
            </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
                {cartNotEmpty &&
                    <OurEnhancedTable data={cartItems} desiredTableColumns={desiredTableColumns} title={'Your Cart Contents'} />
                }
                {!cartNotEmpty &&
                    <Typography gutterBottom variant={"h5"} className={classes.emptyCartHeading}>
                        Your Cart Is Empty
                </Typography>
                }
            <DialogActions style={{marginBottom: '15px', marginLeft: '10px', marginRight: '10px'}}>
                {cartNotEmpty &&
                    <Link onClick={() => {this.handleClose()}} to={'/checkout/'} className={"no-decoration"} key={'checkout'}>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Checkout
                        </Button>
                    </Link>
                }
                    <Button onClick={this.handleClose}>
                        Close
                    </Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(Cart));