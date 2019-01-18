import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import placeholder1 from '../img/placeholder1.jpg';
import placeholder2 from '../img/placeholder2.jpg';
import placeholder3 from '../img/placeholder3.jpg';
import placeholder4 from '../img/placeholder4.jpg';
import placeholder5 from '../img/placeholder5.jpg';
import placeholder6 from '../img/placeholder17.jpg';
import placeholder7 from '../img/placeholder15.jpg';
import placeholder8 from '../img/placeholder16.jpg';
import Tilt from 'react-tilt';
import {withRouter} from 'react-router';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: 'dark',
    }
  });

const styles = {
  card: {
    width: 'calc(100% - 20px)',
    display:'inline-block',
    position: 'relative',
    backgroundColor: '#00000040',
    textAlign: 'left',
    height: '100%',
  },
  media: {
    height: 150,
    paddingTop: '56.25%', // 16:9
  },
  cardPositioningCenter: {
    display: 'inline-block',
    // margin:'10px 0 70px 2%',
    position: 'relative',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  }
};



class SimpleMediaCard extends React.Component {
constructor(props) {
  super(props);
  this.cardElement = React.createRef();
  this.state = {
    imgSrc: this.getRandomImageName()
  }
}

getRandomImageName() {
  let number = Math.floor(Math.random() * 8) + 1;
  if (number === 1) {
    return placeholder1
  } else if (number === 2) {
    return placeholder2
  } else if (number === 3) {
    return placeholder3
  } else if (number === 4) {
    return placeholder4
  } else if (number === 5) {
    return placeholder5
  } else if (number === 6) {
    return placeholder6
  } else if (number === 7) {
    return placeholder7
  } else if (number === 8) {
    return placeholder8
  }
} 

  redirectTo = (event, link) => {
    this.cardElement.current.blur();
    setTimeout(() => {this.props.history.push(link)}, 1)
  }

render() {
  //TODO Props
  const { classes, tiltOptions, isConsideredMobile, link, image } = this.props;
  let {headline, description} = this.props;
  let { imgSrc } = this.state;

  let tiltOptionsUsed = tiltOptions;
  if(!tiltOptions || isConsideredMobile){
    tiltOptionsUsed = { max : 0, scale: 1, speed: 0};
  }

  if(!headline) {
    headline = 'Coincidentia Oppositorum';
  }

  if(!description) {
    description = 'The term is used in describing a revelation of the oneness of things previously believed to be different.';
  }

  if(image) {
    imgSrc = image;
  }


  const actionArea = (
    <CardActionArea style={{height: '100%'}}>
      <CardMedia
        className={classes.media}
        image={imgSrc}
        title="Life or dream?"
      />
      <CardContent className='darkCardBackground full-height'>
        <Typography gutterBottom variant="h5" component="h2">
          {headline}
          </Typography>
        <Typography component="p">
          {description}
          </Typography>
      </CardContent>
    </CardActionArea>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.cardPositioningCenter}>
        <Tilt className={'Tilt'} options={tiltOptionsUsed} style={{ background: 'transparent', height: '100%' }}>
          <Card className={classes.card}>

            {link &&
              // TODO - Rather functionally redirect to link to prevent link styling from ruining card action area styling
              <div style={{height: 'calc(100% - 50px)'}} ref={this.cardElement} onClick={(event) => {this.redirectTo(event, link)}}>
                {actionArea}
              </div>}
            {!link &&
              <div>
                {actionArea}
              </div>}
            <CardActions className='darkCardBackground'>
              <Button size="small" color="secondary">
                Share
          </Button>
              <Button size="small" color="secondary">
                Learn More
          </Button>
            </CardActions>
          </Card>
        </Tilt>
      </div>
    </MuiThemeProvider>
  );
}
}

SimpleMediaCard.propTypes = {
classes: PropTypes.object.isRequired,
theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(SimpleMediaCard));
