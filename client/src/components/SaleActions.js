import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import LinkIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import AddToCart from './AddToCart';
import { connect } from 'react-redux'
import { showCartOverlay, addToCart, removeFromCart } from '../state/actions';
import AddCircleOutlineIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/Remove';
import store from '../state';

import { Query, withApollo } from "react-apollo";

const styles = theme => ({
    root: {
        width: '100%',
        margin: '0px'
    },
    fab: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

const selectionDisplayValue = (value, type) => {
  if(type === 'size'){
    switch(value) {
      case "S":
        return "Small";
      case "M":
        return "Medium";
      case "L":
        return "Large";
      default:
        return value; 
    }
  }
  return value;
}

class SaleActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      isConsideredMobile: store.getState().isConsideredMobile,
    }
  }
    

  componentDidMount() {
    //Set default options
    this.buildOptionSelection(this.props.options, this.props.optionKeyCollection);
  }

  setVariantID(stateExtended = {}) {
    console.log('stateExtended',stateExtended);
    let variantCollection = this.props.options;
    let variantOptionKeys = Object.keys(variantCollection);
    let optionKeys = Object.keys(this.props.optionKeyCollection);
    let selectedVariantID = [];
    for (const variantOptionKey of variantOptionKeys) {
      let match = null;
      for(const optionKey of optionKeys) {
        if((variantCollection[variantOptionKey][optionKey] === this.state[optionKey]) && (match !== false)){
          match = true;
        }else{
          match = false;
        }
      }
      if(match) {
        selectedVariantID.push(variantOptionKey);
      }
    }
    this.setState({selectedVariantID: selectedVariantID[0], ...stateExtended})
  }

  handleChange = event => {
    let optionKeyCollection = this.props.optionKeyCollection;
    let eventTargetName = event.target.name;
    let eventTargetValue = event.target.value;
    this.setState({ [eventTargetName]: eventTargetValue});
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.setVariantID();
    }
  }

  buildOptionSelection = (variantIDsToOptions, optionKeyCollection) => {
    let optionKeys = Object.keys(optionKeyCollection);
    let returnObj = {};
    console.log(optionKeyCollection);
    let stateItems = {};
    let variantIDsToOptionsEntries = Object.entries(variantIDsToOptions);
    if (variantIDsToOptionsEntries.length > 0) {
      for (const variantIDToOption of variantIDsToOptionsEntries) {
        let variantOption = variantIDToOption[1];
        for (const key of optionKeys) {
          if (returnObj[key] && returnObj[key].options) {
            if (returnObj[key].options.indexOf(variantOption[key]) === -1) {
              returnObj[key].options.push(variantOption[key]);
            }
          } else {
            returnObj[key] = {
              type: optionKeyCollection[key].type,
              options: [variantOption[key]]
            };
            stateItems[key] = variantOption[key];
          }
        }
      }
    } else {
      return null;
    }
    let stateExtended = { builtOptions: returnObj, ...stateItems };
    this.setVariantID(stateExtended);
  }

  viewCartItem(event) {
    this.props.dispatch(showCartOverlay(false));
    event.stopPropagation();
  }

  addAnotherCartItem(event, cartItemUnique) {
    this.props.dispatch(addToCart(cartItemUnique));
    event.stopPropagation();
  }

  removeAnotherCartItem(event, cartItemUnique) {
    this.props.dispatch(removeFromCart(cartItemUnique));
    event.stopPropagation();
  }

  render() {
    const { classes, cartItem } = this.props;
    console.log('this.state', this.state);
    console.log('cartItem',cartItem);
    //Ctrl + F: ...stateItems
    const { size, colour, builtOptions, selectedVariantID } = this.state;
    let cartItemUnique = {...cartItem};
    if (size) {
      cartItemUnique.size = selectionDisplayValue(size, 'size');
    }
    if (colour) {
      cartItemUnique.colour = selectionDisplayValue(colour, 'colour');
    }
    let cartActions = (
      <div>
        <Link onClick={(e) => { this.viewCartItem(e) }} to={cartItemUnique.seo} className={"no-decoration"}>
          <Fab size="small" color="primary" aria-label="View Item" title="View Item" alt-text="View Item" className={"cart-action-button"}>
            <LinkIcon />
          </Fab>
        </Link>
        <Fab onClick={(e) => { this.addAnotherCartItem(e, cartItemUnique) }} size="small" color="primary" aria-label="Add One To Cart" title="Add One To Cart" alt-text="Add One To Cart" className={"cart-action-button"}>
          <AddCircleOutlineIcon/>
        </Fab>
        <Fab onClick={(e) => { this.removeAnotherCartItem(e, cartItemUnique) }} size="small" color="primary" aria-label="Remove One From Cart" title="Remove One From Cart" alt-text="Remove One From Cart" className={"cart-action-button"}>
          <RemoveCircleOutlineIcon/>
        </Fab>
      </div>
    )
    cartItemUnique.actions = () => cartActions;
    cartItemUnique.variantID = selectedVariantID;
    cartItemUnique.artworkID = cartItem.artworkID;
    if (selectedVariantID) {
      cartItemUnique._id = cartItem.artworkID + "$" + selectedVariantID;
    }
    console.log('cartItemUnique,',cartItemUnique);
    let price = cartItemUnique.price;
    return (
      <div>
        <Typography className="heavy-text-shadow no-margin" gutterBottom variant={"h4"}>
          ${price}
        </Typography>
        <div>
          {builtOptions && Object.keys(builtOptions).map((item) => {
            let optionType = builtOptions[item].type;
            if (optionType === 'list') {
              return (
                <FormControl key={item} className={classes.formControl}>
                  <InputLabel htmlFor={item + "-simple"}>
                    {item}
                  </InputLabel>
                  <Select
                    value={this.state[item]}
                    onChange={this.handleChange}
                    inputProps={{
                      name: item,
                      id: item + "-simple",
                    }}
                  >
                    {builtOptions[item].options.map((optionValue) => {
                      return (
                        <MenuItem key={optionValue} value={optionValue}>{selectionDisplayValue(optionValue, item)}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            }
          })}
          <div className={'inline-flex'}>
            <AddToCart cartItem={cartItemUnique} />
          </div>
        </div>
      </div>
    );
  }
}

SaleActions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withApollo(connect()(SaleActions)));