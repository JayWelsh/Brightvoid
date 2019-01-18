import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleMediaCard from '../components/SimpleMediaCard';
import Checkout from './Checkout';
import Grid from '@material-ui/core/Grid';
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";

const tiltOptionsCard = { max: 3, scale: 1.015, reverse: true };

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="mobile-friendly-padding" style={{ justifyContent:'space-between', height:'calc(100%)' }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  }
});

class CheckoutPage extends React.Component {
  render() {
    const { classes, pagePadding, isConsideredMobile } = this.props;
    let pagePaddingStyle = {paddingTop: pagePadding};
    return (
      <div className={classes.root} style={pagePaddingStyle}>
        <Grid container className={classes.root} spacing={24}>
          <Grid item xs={0} sm={0} md={2} lg={2} className={"disable-padding"}>
          </Grid>
          <Grid container xs={12} sm={12} md={8} lg={8}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                Checkout
              </Typography>
              <Checkout/>
            </Grid>
          </Grid>
          <Grid item xs={0} sm={0} md={2} lg={2} className={"disable-padding"}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles, { withTheme: true })(CheckoutPage));