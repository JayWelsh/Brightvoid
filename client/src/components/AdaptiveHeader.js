import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import store from '../state';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  }
});

console.log('store',store.getState());

class AdaptiveHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            screenWidth: store.getState().screenWidth,
            screenHeight: store.getState().screenHeight,
            isConsideredMobile: store.getState().isConsideredMobile,
        }
        store.subscribe(() => {
            this.setState({
                screenWidth: store.getState().screenWidth,
                screenHeight: store.getState().screenHeight,
                isConsideredMobile: store.getState().isConsideredMobile,
            });
        });
    }

  render() {
    const { classes, headerClass, component, children, dangerouslyRenderHTML } = this.props;
    let {gutterBottom} = this.props;
    let {screenWidth, screenHeight, isConsideredMobile} = this.state;
    if(!gutterBottom) {
        gutterBottom = false;
    }
    let variant = 'h2';
    if (isConsideredMobile || (screenWidth < 400)) {
        variant = 'h4'
    } else if (screenWidth < 550) {
        variant = 'h3'
    } else if (screenWidth < 650) {
        variant = 'h2'
    }
    console.log('variant',variant);
    return (
        <div className={classes.root}>
            <Grid container className={classes.root} spacing={24}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography className={headerClass} gutterBottom variant={variant} component={component}>
                        {dangerouslyRenderHTML && 
                        children
                        }
                        {!dangerouslyRenderHTML &&
                        children
                        }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
  }
}

AdaptiveHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AdaptiveHeader);