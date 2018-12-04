import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleMediaCard from '../components/SimpleMediaCard';
import Grid from '@material-ui/core/Grid';
import Carousel from 're-carousel';
import placeHolderImage1 from '../img/placeholder5.jpg';
import placeHolderImage2 from '../img/placeholder16.jpg';
import placeHolderImage3 from '../img/placeholder17.jpg';
import placeHolderImage4 from '../img/placeholder1.jpg';
import placeHolderImage5 from '../img/placeholder2.jpg';
import placeHolderImage6 from '../img/placeholder3.jpg';
import placeHolderImage7 from '../img/placeholder4.jpg';
import placeHolderImage8 from '../img/placeholder15.jpg';
import Tilt from 'react-tilt';
import Button from '@material-ui/core/Button';
import blackShirt from '../img/black-shirt.png';
import whiteShirt from '../img/mockup2.png';
import mockupGraphic from '../img/mockup-graphic.png';
import CarouselButtons from './CarouselButtons';
import { Link } from 'react-router-dom';
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="mobile-friendly-padding" style={{ justifyContent: 'space-between', height: 'calc(100%)' }}>
      {children}
    </Typography>
  );
}

const tiltOptionsCard = { max: 3, scale: 1.015, reverse: true };
const tiltOptionsCarousel = { max: 10, scale: 1.025, reverse: true };

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
    let carouselHeight = window.innerHeight * 0.95 - 64;
    let carouselStyle = { paddingBottom: pagePadding, height: carouselHeight };
    let carouselTitleSize = 'h1';
    if (isConsideredMobile || (carouselHeight < 350)) {
      carouselTitleSize = 'h4'
    } else if (carouselHeight < 500) {
      carouselTitleSize = 'h3'
    } else if (carouselHeight < 650) {
      carouselTitleSize = 'h2'
    }

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
            console.log("data",data)
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( ${error}</p>;
              if(data && data.carouselslides){
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
              
            return ( <Grid container className={classes.root} spacing={24}>
              <Grid item xs={false} sm={false} md={false} lg={false} className={"disable-padding"}>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div style={carouselStyle}>
                    <Carousel className={"carousel-custom"} widgets={[CarouselButtons]} duration={300}>
                      {
                        
                        data.carouselslides.map(slide => (
                        <div style={{ background: 'transparent', height: '100%', backgroundImage: 'url(' + slide.backgroundimage.url + ')', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
                          <Tilt className={'Tilt hide-overflow-container'} options={tiltOptionsCarousel} style={{ background: 'transparent', height: '100%' }}>
                            <img className="Tilt-inner shadow-filter disable-mouse-events" style={{ maxHeight: '80%', maxWidth: '100%', position: 'absolute', top: '50%', left: '50%', opacity: '0.98', transform: 'translateX(-50%)translateY(-50%)' }} src={slide.foregroundimage.url}></img>
                            <Typography style={{ position: 'absolute', textAlign: 'center', top: '60%' }} className="Tilt-inner rock-salt heavy-text-shadow float-effect disable-mouse-events" gutterBottom variant={carouselTitleSize} component="h1">
                              {slide.title}
                          </Typography>
                          </Tilt>
                          <Link to={'/artwork/' + slide.link} className={"no-decoration flex-center absolute-center"}>
                            <Button variant="contained" color="primary" size="large" className={classes.button}>
                              View Piece
                        </Button>
                          </Link>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={false} sm={false} md={false} lg={false} className={"disable-padding"}>
              </Grid>
              <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
              </Grid>
              <Grid container>
                <div className={"flex-center flex-wrap"} style={{ width: 'calc(100%)' }}>
                <div style={{ display: 'inline-block' }}>
                    <SimpleMediaCard tiltOptions={tiltOptionsCard} isConsideredMobile={isConsideredMobile} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <SimpleMediaCard tiltOptions={tiltOptionsCard} isConsideredMobile={isConsideredMobile} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <SimpleMediaCard tiltOptions={tiltOptionsCard} isConsideredMobile={isConsideredMobile} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <SimpleMediaCard tiltOptions={tiltOptionsCard} isConsideredMobile={isConsideredMobile} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={false} sm={false} md={1} lg={1} className={"disable-padding"}>
          </Grid>
            </Grid>
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