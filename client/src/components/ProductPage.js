import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import OurImageGallery from './OurImageGallery';
import SaleActions from './SaleActions';
import AdaptiveHeader from './AdaptiveHeader';
import Card from '@material-ui/core/Card';
import {groupImageCollectionByProductID, buildSalesActionsOptions} from '../utils';

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
    width: '100%',
    margin: '0px',
  },
  descriptionArea: {
    margin: theme.spacing.unit
  }
});

function productPagePlaceholder(classes) {
  return (<Grid container spacing={24} className={classes.root}>
  <Grid item xs={false} sm={false} md={1} lg={1}>
  </Grid>
  <Grid item xs={12} sm={12} md={10} lg={10}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <AdaptiveHeader headerClass="rock-salt heavy-text-shadow text-center" variant="h4" component="h1">
        Loading
      </AdaptiveHeader>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <OurImageGallery images={[]} />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <div className={classes.descriptionArea}>
            <Typography className="heavy-text-shadow" gutterBottom variant={"h6"}>
              Description
            </Typography>
            <Typography className="heavy-text-shadow" gutterBottom variant={"body1"}>
              Loading Description
            </Typography>
          </div>
          
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  <Grid item xs={false} sm={false} md={1} lg={1}>
  </Grid>
</Grid>)
}

class ProductPage extends React.Component {

  

  render() {
    const { classes, artworkNameSEO, productNameSEO } = this.props;
    let pagePaddingStyle = { paddingTop: '15px' };
    return (
      <div className={classes.root} style={pagePaddingStyle}>
        <Query
          query={
            gql`query {
              artworks(where:{seo:"${artworkNameSEO}"}) {
                _id
                name
                seo
                images {
                  url
                }
                description
                products(where:{seo:"${productNameSEO}"}) {
                  _id
                  seo
                  name
                  price
                  barebone {
                    name
                    variants {
                      _id
                      name
                      size
                      colour
                    }
                  }
                }
                imagecollections {
                  name
                  product {
                    _id
                  }
                  images {
                    url
                  }
                }
              }
            }`
          }
        >
          {({ loading, error, data }) => {
            if (loading) return productPagePlaceholder(classes);
            if (error) return <p>Error :( ${error}</p>;
            if (data && data.artworks[0] && data.artworks[0].products[0]) {
              let artwork = data.artworks[0];
              let product = artwork.products[0];
              let variants = product.barebone.variants;
              console.log('product',product);
              console.log('artwork',artwork);
              console.log('variants', variants);
              let optionKeyCollection = {
                size: {
                  type: 'list'
                },
                colour: {
                  type: 'list'
                }
              };
              let salesActionsOptions = buildSalesActionsOptions(variants, optionKeyCollection);
              let productID = product._id;
              let imageCollections = artwork.imagecollections;
              let productIDToImages = groupImageCollectionByProductID(imageCollections);
              let cartItem = JSON.parse(JSON.stringify(product));
              cartItem.images = productIDToImages[productID];
              cartItem.name = artwork.name + ' ' + product.name;
              cartItem.seo = "/artwork/" + artwork.seo + "/" + product.seo + "/"
              cartItem.quantity = 1;
              cartItem.artworkID = artwork._id;
              return (
                <Grid container spacing={24} className={classes.root}>
                  <Grid item xs={false} sm={false} md={1} lg={1}>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} lg={10}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <AdaptiveHeader headerClass="rock-salt heavy-text-shadow text-center" variant="h4" component="h1" dangerouslyRenderHTML>
                        {artwork.name}<br/>{product.name}
                      </AdaptiveHeader>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                          <OurImageGallery images={productIDToImages[productID]} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <div className={classes.descriptionArea}>
                            <Typography className="heavy-text-shadow" gutterBottom variant={"h6"}>
                              Description
                            </Typography>
                            <Typography className="heavy-text-shadow" gutterBottom variant={"body1"}>
                              {artwork.description}
                            </Typography>
                            <SaleActions optionKeyCollection={optionKeyCollection} options={salesActionsOptions} cartItem={cartItem} />
                          </div>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={false} sm={false} md={1} lg={1}>
                  </Grid>
                </Grid>
              )
            } else {
              return (<Grid container className={classes.root} spacing={24}>
                <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>

                  <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                    Product<br />Not<br />Found
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

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles, { withTheme: true })(ProductPage));