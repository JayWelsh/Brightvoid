import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import OurImageGallery from './OurImageGallery';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="mobile-friendly-padding" style={{ justifyContent: 'space-between', height: 'calc(100%)' }}>
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

class ArtworkPage extends React.Component {
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
    const { classes, artworkNameSEO } = this.props;
    let pagePaddingStyle = { paddingTop: 0 };
    return (
      <div className={classes.root} style={pagePaddingStyle}>
        <Query
          query={
            gql`query {
              products(where:{seo:"${artworkNameSEO}"}) {
                name
                images {
                  url
                }
                description
              }
            }`
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( ${error}</p>;
              if(data.products[0]) {
            let product = data.products[0];
            return (
              <Grid container className={classes.root} spacing={24}>
                <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                      {product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <OurImageGallery images={product.images} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography className="heavy-text-shadow" gutterBottom variant={"h6"}>
                          Description
                        </Typography>
                        <Typography className="heavy-text-shadow" gutterBottom variant={"body1"}>
                          {product.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
                </Grid>
              </Grid>
            )
          }else{
            return (<Grid container className={classes.root} spacing={24}>
              <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8}>

                <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                  Artwork<br/>Not<br/>Found
                </Typography>

              </Grid>
              <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
              </Grid>
            </Grid>)
          }
          }}
        </Query>
      </div>
    );
  }
}

ArtworkPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles, { withTheme: true })(ArtworkPage));