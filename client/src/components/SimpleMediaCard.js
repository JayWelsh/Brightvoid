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
    backgroundColor: 'transparent',
    marginBottom: '20px',
    textAlign: 'left',
  },
  media: {
    backgroundRepeat: 'inherit',
    height: 150,
    paddingTop: '56.25%', // 16:9
  },
  cardPositioningCenter: {
    display: 'inline-block',
    // margin:'10px 0 70px 2%',
    position: 'relative',
    textAlign: 'center',
  }
};

class SimpleMediaCard extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    imgSrc: this.getRandomImageName()
  }
}

handleChange = (event, value) => {
  this.setState({ value });
};

handleChangeIndex = index => {
  this.setState({ value: index });
};

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

render() {
  //TODO Props
  const { classes, tiltOptions, isConsideredMobile} = this.props;
  const { imgSrc } = this.state;

  let tiltOptionsUsed = tiltOptions;
  if(!tiltOptions || isConsideredMobile){
    tiltOptionsUsed = { max : 0, scale: 1, speed: 0};
  }

  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.cardPositioningCenter}>
    <Tilt className={'Tilt'} options={tiltOptionsUsed} style={{background: 'transparent', height: '100%'}}>
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgSrc}
          title="Life or dream?"
        />
        <CardContent className='darkCardBackground'>
          <Typography gutterBottom variant="h5" component="h2">
            Coincidentia Oppositorum
          </Typography>
          <Typography component="p">
            The term is used in describing a revelation of the oneness of things previously believed to be different.
          </Typography>
        </CardContent>
        </CardActionArea>
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

export default withStyles(styles, { withTheme: true })(SimpleMediaCard);
