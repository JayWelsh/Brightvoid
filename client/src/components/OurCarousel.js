import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Carousel from 're-carousel';
import CarouselButtons from './CarouselButtons';
import Tilt from 'react-tilt';
import Button from '@material-ui/core/Button';
import { throwServerError } from 'apollo-link-http-common';
import store from '../state';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  }
});

class OurCarousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      carouselHeight: store.getState().screenHeight * 0.95 - 64,
      isConsideredMobile: store.getState().isConsideredMobile,
    }
    store.subscribe(() => {
      this.setState({
        carouselHeight: this.state.isConsideredMobile ? this.state.carouselHeight : store.getState().screenHeight * 0.95 - 64,
        isConsideredMobile: store.getState().isConsideredMobile,
      });
    });
    this.carouselContainer = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.carouselHeight !== this.state.carouselHeight) {
      
    }
  }

  render() {
    const { classes, carouselData, tiltOptionsCarousel } = this.props;
    const {carouselHeight, isConsideredMobile} = this.state;

    let carouselStyle = { height: carouselHeight };
    let carouselTitleSize = 'h1';
    if (isConsideredMobile || (carouselHeight < 350)) {
      carouselTitleSize = 'h4'
    } else if (carouselHeight < 500) {
      carouselTitleSize = 'h3'
    } else if (carouselHeight < 650) {
      carouselTitleSize = 'h2'
    }
    
    return (
        <Grid container className={classes.root} spacing={24}>
        <Grid item xs={false} sm={false} md={false} lg={false} className={"disable-padding"}>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div ref={this.carouselContainer} style={carouselStyle}>
              <Carousel className={"carousel-custom"} widgets={[CarouselButtons]} duration={300}>
                {carouselData &&
                  carouselData.map((slide, index) => (
                  <div key={index} style={{ background: 'transparent', height: '100%', backgroundImage: 'url(' + slide.backgroundimage.url + ')', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
                    <Tilt className={'Tilt hide-overflow-container'} options={tiltOptionsCarousel} style={{ background: 'transparent', height: '100%' }}>
                      <img alt={slide.title} className="Tilt-inner shadow-filter disable-mouse-events" style={{ maxHeight: '80%', maxWidth: '100%', position: 'absolute', opacity: '0.98' }} src={slide.foregroundimage.url}></img>
                      <Typography style={{ position: 'absolute', textAlign: 'center', top: '60%' }} className="Tilt-inner rock-salt heavy-text-shadow float-effect disable-mouse-events" gutterBottom variant={carouselTitleSize} component="h1">
                        {slide.title}
                      </Typography>
                    </Tilt>
                    <Link to={slide.link + '/'} className={"no-decoration flex-center absolute-center"}>
                      <Button variant="contained" color="primary" size="large" className={classes.button}>
                        VIEW THIS
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
        </Grid>
    );
  }
}

OurCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect()(OurCarousel));