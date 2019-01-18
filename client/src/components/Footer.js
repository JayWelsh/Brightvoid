import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query, withApollo } from "react-apollo";

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  }
});

class Footer extends React.Component {

  render() {
    const { classes } = this.props;
    let pagePaddingStyle = { paddingTop: 0 };
    return (
        <footer className={classes.root + ' our-gradient'} style={pagePaddingStyle}>
            <Grid container className={classes.root} spacing={24}>
                <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            <Grid className='flex-center' item xs={12} sm={12} md={4} lg={4}>
                                <Typography className="Tilt-inner heavy-text-shadow uppercase" gutterBottom variant={"h5"}>
                                    Products
                                </Typography>
                            </Grid>
                            <Grid className='flex-center' item xs={12} sm={12} md={4} lg={4}>
                                <Typography className="Tilt-inner heavy-text-shadow uppercase" gutterBottom variant={"h5"}>
                                    About
                                </Typography>
                            </Grid>
                            <Grid className='flex-center' item xs={12} sm={12} md={4} lg={4}>
                                <Typography className="Tilt-inner heavy-text-shadow uppercase" gutterBottom variant={"h5"}>
                                    Support
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
                </Grid>
            </Grid>
        </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles, { withTheme: true })(Footer));