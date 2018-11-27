import React from 'react'
import propTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '50%',
    textAlign: 'center'
  },
  btn: {
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '0',
    font: '16px/30px sans-serif',
    color: 'rgba(255,255,255,0.8)',
    transform: 'translateY(50%)',
  },
  left: {
    left: '0',
    display: 'inline-block',
  },
  right: {
    right: '0',
    display: 'inline-block',
  }
})

function CarouselButtons (props) {
  const { index, total, loop, prevHandler, nextHandler, classes } = props
  
  return (
    <div className={classes.wrapper}>
      { (loop || index !== 0) && (
        
        <div className={classes.btn + " " + classes.left + " disable-webkit-tap-highlight"} onClick={prevHandler}>
          <Button variant="fab" color="secondary" aria-label="Previous Slide" className={classes.button}>
            <NavigateBefore />
          </Button>
        </div>
      )}
      { (loop || index !== total - 1) && (
        <div className={classes.btn + " " + classes.right + " disable-webkit-tap-highlight"} onClick={nextHandler}>
          <Button variant="fab" color="secondary" aria-label="Next Slide" className={classes.button}>
          <NavigateNext />
        </Button>
        </div>
      )}
    </div>
  )
}

CarouselButtons.propTypes = {
  index: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  prevHandler: propTypes.func,
  nextHandler: propTypes.func
}

export default withStyles(styles)(CarouselButtons);