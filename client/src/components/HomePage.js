import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleMediaCard from '../components/SimpleMediaCard';
import Grid from '@material-ui/core/Grid';
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import OurCarousel from './OurCarousel';
import BrowseArtworkPage from './BrowseArtworkPage';
import curls from '../img/curls.png';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="mobile-friendly-padding" style={{ justifyContent: 'space-between', height: 'calc(100%)' }}>
      {children}
    </Typography>
  );
}

const tiltOptionsCard = { max: 3, scale: 1.015, reverse: true };
//const tiltOptionsCarousel = { max: 10, scale: 1.025, reverse: true };
const tiltOptionsCarousel = { max: 0, scale: 1, reverse: true };

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  },
});

class HomePage extends React.Component {
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
    const { classes, pagePadding, isConsideredMobile } = this.props;
    let pagePaddingStyle = { paddingTop: 0 };
    console.log("pagePadding", pagePadding);

    return (
      <div className={classes.root} style={pagePaddingStyle}>
        <Query
          query={
            gql`query {
              carouselslides(where: {featured:true}){
                _id,
                title,
                link,
                foregroundimage {
                  url
                },
                backgroundimage {
                  url
                }
              }
            }
            `
          }
        >
          {({ loading, error, data }) => {
            console.log("data", data)
            if (loading) return <OurCarousel carouselData={null} isConsideredMobile={isConsideredMobile} tiltOptionsCarousel={tiltOptionsCarousel} pagePadding={pagePadding} />;
            if (error) return <p>Error :( ${error}</p>;
            if (data && data.carouselslides) {
              let usedIds = [];
              data.carouselslides = data.carouselslides.filter((item) => {
                if (usedIds.indexOf(item._id) !== -1) {
                  return false;
                } else {
                  usedIds.push(item._id);
                  return true;
                }
              });
            }

            return (
              <div>
                <div style={{backgroundImage: `url(${curls})`}}>
                  <OurCarousel carouselData={data.carouselslides} isConsideredMobile={isConsideredMobile} tiltOptionsCarousel={tiltOptionsCarousel} pagePadding={pagePadding} />
                </div>
                <div>
                  <Grid container className={classes.root} spacing={24}>
                    <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
                    </Grid>
                    <Grid container>
                      <BrowseArtworkPage hideHeading={true}/>
                    </Grid>
                    <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
                    </Grid>
                  </Grid>
                </div>
              </div>
            )
          }}
        </Query>
      </div >
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles, { withTheme: true })(HomePage));