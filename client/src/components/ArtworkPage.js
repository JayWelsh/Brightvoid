import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import OurImageGallery from './OurImageGallery';
import SaleActions from './SaleActions';
import Card from '@material-ui/core/Card';
import Tilt from 'react-tilt';
import SimpleMediaCard from './SimpleMediaCard';
import {groupImageCollectionByProductID} from '../utils';
import AdaptiveHeader from './AdaptiveHeader';
import store from '../state';

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

class ArtworkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConsideredMobile: store.getState().isConsideredMobile,
      initialRender: true
    }
  }

  componentDidMount() {
    let thisPersist = this;
    setTimeout(function(){
      thisPersist.setState({initialRender: false});
    }, 250)
  }

  renderPlaceholder(classes, isConsideredMobile, disableMouseInteractions, artworkTiltOptions) {
    if (!isConsideredMobile) {
      return (
        <Grid container className={classes.root} spacing={24}>
          <Grid item xs={false} sm={false} md={1} lg={2} className={"disable-padding"}>
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={8}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <Tilt className={"Tilt" + disableMouseInteractions} options={artworkTiltOptions} style={{ width: '100%' }} >
                      <div style={{ height: '500px' }} />
                      <div className={"Tilt-inner"} style={{ position: 'absolute', height: '100%', width: '100%' }}>
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)translateX(-50%)' }}>
                          <AdaptiveHeader headerClass="rock-salt heavy-text-shadow text-center float-effect" variant="h4" component="h1">
                            Loading...
                        </AdaptiveHeader>
                        </div>
                      </div>
                    </Tilt>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className={classes.descriptionArea}>
                    <Typography className="heavy-text-shadow" gutterBottom variant={"h6"}>
                      Meaning
                  </Typography>
                    <Typography className="heavy-text-shadow" gutterBottom variant={"body1"}>
                      Loading...
                  </Typography>
                  </div>
                </Grid>
                <Grid container>
                  <Grid key={1} style={{ paddingBottom: '15px' }} item xs={12} sm={6} md={6} lg={4}>
                    <SimpleMediaCard headline={"Loading..."} description={"Loading..."} image={' '} link={'./'} />
                  </Grid>
                  <Grid key={2} style={{ paddingBottom: '15px' }} item xs={12} sm={6} md={6} lg={4}>
                    <SimpleMediaCard headline={"Loading..."} description={"Loading..."} image={' '} link={'./'} />
                  </Grid>
                  <Grid key={3} style={{ paddingBottom: '15px' }} item xs={12} sm={6} md={6} lg={4}>
                    <SimpleMediaCard headline={"Loading..."} description={"Loading..."} image={' '} link={'./'} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={false} sm={false} md={1} lg={2} className={"disable-padding"}>
          </Grid>
        </Grid>
      )
    } else {
      return (<div></div>)
    }
  }

  render() {
    const { classes, artworkNameSEO } = this.props;
    const {initialRender, isConsideredMobile} = this.state;
    let pagePaddingStyle = { paddingTop: '15px' };
    let disableMouseInteractions = " disable-mouse-events";
    if(!initialRender) {
      disableMouseInteractions = "";
    }
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
                products {
                  _id
                  seo
                  name
                  barebone {
                    name
                    variants {
                      name
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
            let artworkTiltOptions = { max: 10, speed: 2000  };
            if (loading) return this.renderPlaceholder(classes, isConsideredMobile, disableMouseInteractions, artworkTiltOptions);
            if (error) return <p>Error :( ${error}</p>;
            if (data && data.artworks[0]) {
              console.log('data.artworks',data.artworks);
              let artwork = data.artworks[0];
              let imageCollections = artwork.imagecollections;
              let productIDToImages = groupImageCollectionByProductID(imageCollections);
              console.log('productIDToImages', productIDToImages);
              console.log('artwork.images[0]',artwork.images[0].url);
              return (
                <Grid container className={classes.root} spacing={24}>
                  <Grid item xs={false} sm={false} md={1} lg={2} className={"disable-padding"}>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} lg={8}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          {!isConsideredMobile && <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                            <Tilt className={"Tilt" + disableMouseInteractions} options={artworkTiltOptions} style={{ width: '100%'}} >
                              <div style={{ height: '500px' }}>
                                <img style={{ maxHeight: '100%', height: 'auto', maxWidth: '100%' }} src={artwork.images[0].url} alt={artwork.name} />
                              </div>
                              <div className={"Tilt-inner"} style={{ position: 'absolute', height: '100%', width: '100%' }}>
                                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)translateX(-50%)' }}>
                                  <AdaptiveHeader headerClass="rock-salt heavy-text-shadow text-center float-effect" variant="h4" component="h1">
                                    {artwork.name}
                                  </AdaptiveHeader>
                                </div>
                              </div>
                            </Tilt>
                          </div>}
                            {isConsideredMobile &&
                              <div style={{position: 'relative'}}>
                                <img style={{ maxWidth: '100%', height: 'auto' }} src={artwork.images[0].url} alt={artwork.name} />
                                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)translateX(-50%)'}}>
                                <AdaptiveHeader headerClass="Tilt-inner rock-salt heavy-text-shadow text-center float-effect" variant="h4" component="h1">
                                  {artwork.name}
                                </AdaptiveHeader>
                                </div>
                              </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div className={classes.descriptionArea}>
                            <Typography className="heavy-text-shadow" gutterBottom variant={"h6"}>
                              Meaning
                            </Typography>
                            <Typography className="heavy-text-shadow" gutterBottom variant={"body1"}>
                              {artwork.description}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid container>
                          {artwork.products.map((item, index) =>
                            <Grid key={item} style={{paddingBottom: (index === (artwork.products.length - 1) && isConsideredMobile) ? '0px' : '15px'}} item xs={12} sm={6} md={6} lg={4}>
                              <SimpleMediaCard headline={item.name} description={item.description} image={productIDToImages[item._id] ? productIDToImages[item._id][0].url : ' '} link={'./' + item.seo + '/'} />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={false} sm={false} md={1} lg={2} className={"disable-padding"}>
                  </Grid>
                </Grid>
              )
            } else {
              return (<Grid container className={classes.root} spacing={24}>
                <Grid item xs={false} sm={false} md={2} lg={2} className={"disable-padding"}>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>

                  <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                    Artwork<br />Not<br />Found
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