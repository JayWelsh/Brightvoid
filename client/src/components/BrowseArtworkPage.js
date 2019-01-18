import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleMediaCard from '../components/SimpleMediaCard';
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

class BrowseArtworkPage extends React.Component {
  render() {
    const { classes, pagePadding, isConsideredMobile, hideHeading } = this.props;
    let pagePaddingStyle = {paddingTop: pagePadding};
    return (
      <div className={classes.root} style={pagePaddingStyle}>
        <Grid container className={classes.root} spacing={24}>
          <Grid item xs={0} sm={0} md={2} lg={2} className={"disable-padding"}>
          </Grid>
          <Grid container xs={12} sm={12} md={8} lg={8}>
            {!hideHeading &&
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{ textAlign: 'center' }} className="Tilt-inner rock-salt heavy-text-shadow" gutterBottom variant={"h2"} component="h1">
                  Artwork
                </Typography>
              </Grid>
            }
            <Query
              query={
                gql`query {
              artworks {
                _id
                name
                seo
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
                if (data && data.artworks) {
                  return (
                    <div className={"flex-center flex-wrap flex-stretch"} style={{ width: 'calc(100%)', marginBottom: '20px' }}>
                      {data.artworks.map((artwork) => {
                        let artworkImage = null;
                        if(artwork.images && artwork.images[0].url){
                          artworkImage = artwork.images[0].url;
                        }
                        return (
                          <Grid style={{marginTop: '20px'}} item xs={12} sm={6} md={6} lg={6}>
                          <div className={'full-height full-width'} style={{ display: 'inline-block' }}>
                            <SimpleMediaCard link={'/artwork/' + artwork.seo + "/"} image={artworkImage} headline={artwork.name} description={artwork.description} isConsideredMobile={isConsideredMobile} />
                          </div>
                          </Grid>
                        )
                      })}
                    </div>
                  )
                }
              }}
            </Query>
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

export default withApollo(withStyles(styles, { withTheme: true })(BrowseArtworkPage));