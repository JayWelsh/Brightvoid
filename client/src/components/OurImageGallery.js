import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CarouselButtons from './CarouselButtons';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px'
  }
});

class OurImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.imageSlider = React.createRef();
        this.imageCollection = [];
        this.state = {
            value: 0,
            startScrollFrom: 0,
            dragging: false,
            lastSetScroll: 0,
            disableImageSelection: false,
        };
    }

    handleChangeIndex = (index) => {
        let imageSliderElement = this.imageSlider.current;
        let selectedImageElement = this.imageCollection[index];
        let imagePosition = selectedImageElement.getBoundingClientRect();
        let imageSliderPosition = imageSliderElement.getBoundingClientRect();
        if(imagePosition.right > imageSliderPosition.right){
            imageSliderElement.scrollLeft = (imagePosition.right - imageSliderPosition.right) + imageSliderElement.scrollLeft;
        } else if(imagePosition.left < imageSliderPosition.left){
            imageSliderElement.scrollLeft = (imagePosition.left - imageSliderPosition.left) + imageSliderElement.scrollLeft;
        }
        if (index !== this.state.value && (!this.state.dragging)) {
            this.setState({ value: index });
        }
    };

    prevHandler = () => {
        let setIndex = this.state.value - 1;
        this.handleChangeIndex(setIndex);
    }

    nextHandler = () => {
        let setIndex = this.state.value + 1;
        this.handleChangeIndex(setIndex);
    }

    dragScroll = (e) => {
        let disableImageSelection = false;
        if (this.state.dragging) {
            let imageSlider = this.imageSlider.current;
            let lastSetScroll = this.state.lastSetScroll;
            let scrollDifference = this.state.startScrollFrom - e.pageX;
            let setScrollDifference = (this.state.startScrollFrom - e.pageX) + lastSetScroll;
            let imageSliderAvailableScroll = (imageSlider.scrollWidth - imageSlider.clientWidth);
            if((scrollDifference > 20) || (scrollDifference < -20)){
                disableImageSelection = true;
            }
            if ((setScrollDifference <= imageSliderAvailableScroll) && (setScrollDifference >= -imageSliderAvailableScroll)) {
                imageSlider.scrollLeft = setScrollDifference;
                this.setState({disableImageSelection: disableImageSelection});
            } else if(setScrollDifference > imageSliderAvailableScroll){
                imageSlider.scrollLeft = imageSliderAvailableScroll;
                this.setState({startScrollFrom: e.pageX, lastSetScroll: imageSliderAvailableScroll, disableImageSelection: disableImageSelection});
            } else if(setScrollDifference < imageSliderAvailableScroll){
                imageSlider.scrollLeft = 0;
                this.setState({startScrollFrom: e.pageX, lastSetScroll: 0, disableImageSelection: disableImageSelection});
            }
        }else{
            this.setState({disableImageSelection: disableImageSelection});
        }
    }

    setDragging = (setting, e) => {
        let lastSetScroll = this.imageSlider.current.scrollLeft;
        let startScrollFrom = e.pageX;
        this.setState({ dragging: setting, startScrollFrom: startScrollFrom, lastSetScroll: lastSetScroll });
        e.stopPropagation()
        e.preventDefault()
    }

  render() {
    const { classes, images, disableOverview } = this.props;
    const { value, dragging, disableImageSelection } = this.state;
    let galleryStyle = { paddingTop: 0 };
    let animateScrollClass = dragging ? '' : ' animate-scroll';
    let disableClicksOnSelection = disableImageSelection ? ' disable-mouse-events' : '';
    return (
        <div className={classes.root} style={galleryStyle}>
            <Grid container className={classes.root} spacing={24}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card className='dark-transparent'>
                       
                            <div>
                                {images && images[value] &&
                                    <div className={'our-gallery-selected-image flex-center'}>
                                        <CarouselButtons prevHandler={this.prevHandler} nextHandler={this.nextHandler} index={value} total={images.length} />
                                        <img className={'our-gallery-image'} src={images[value].url} alt={images[value].title}></img>
                                    </div>
                                }
                                {(!images || (images.length === 0)) &&
                                    <div className={'our-gallery-selected-image flex-center our-gallery-image'}>
                                    </div>
                                }
                                {!disableOverview &&
                                <div ref={this.imageSlider} className={"our-gallery-image-slider overflow-x-scroll overflow-y-hide" + animateScrollClass} onMouseDown={(e) => { this.setDragging(true, e) }} onMouseUp={(e) => { this.setDragging(false, e) }} onMouseLeave={(e) => { this.setDragging(false, e) }} onMouseMove={(e) => { this.dragScroll(e) }}>
                                    <div className={'our-gallery-items inline-flex'}>
                                        {images && images[value] && images.map((image, index) => {
                                            let selectionClass = index === value ? " our-gallery-selection" : "";
                                            return (
                                                <div className={'our-gallery-single-image-container pointer' + selectionClass + disableClicksOnSelection} ref={(element) => { this.imageCollection[index] = element }} onClick={(e) => { this.handleChangeIndex(index) }} key={index}>
                                                    <img className={'our-gallery-image our-gallery-image-item'} src={image.url} alt={image.title}></img>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                }
                            </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
  }
}

OurImageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(OurImageGallery);