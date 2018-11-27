import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleMediaCard from '../components/SimpleMediaCard';
import Grid from '@material-ui/core/Grid';

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
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    margin: '0px'
  }
});

class BrowseArtworkPage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, pagePadding } = this.props;
    let pagePaddingStyle = {paddingTop: pagePadding};
    return (
      <div className={classes.root} style={pagePaddingStyle}>
        
            <Grid container className={classes.root} spacing={24}>
              <Grid item xs={0} sm={0} md={2} lg={2} className={"disable-padding"}>
              </Grid>
              <Grid container xs={12} sm={12} md={8} lg={8}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <SimpleMediaCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                <SimpleMediaCard />
                </Grid>
              </Grid>
              <Grid item xs={0} sm={0} md={2} lg={2} className={"disable-padding"}>
              </Grid>
            </Grid>
      </div>
    );
  }
}

BrowseArtworkPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BrowseArtworkPage);