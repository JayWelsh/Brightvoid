import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomePage from './HomePage';
import BrowseArtworkPage from './BrowseArtworkPage';
import ArtworkPage from './ArtworkPage';
import {Route, withRouter} from 'react-router-dom';

const styles = theme => ({
    pageContainer: {
        minHeight:'calc(100vh - 112px)'
    }
});

const desktopPagePadding = 25;
const mobilePagePadding = 10;

class PageContainer extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isConsideredMobile: PropTypes.bool.isRequired
  }

  state = {
    history:  this.props.history
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    //TODO Props
    const { classes, isConsideredMobile } = this.props;
    console.log("isConsideredMobile in page container",isConsideredMobile);
    return (
      <div className={classes.pageContainer}>
          <Route exact={true} path="/" render={(props) => HomePageRoute(props, isConsideredMobile)}/>
          <Route exact={true} path="/artwork/:artworkNameSEO" render={(props) => ArtworkPageRoute(props, isConsideredMobile)}/>
          <Route exact={true} path="/artwork" render={(props) => ArtworkPageRoute(props, isConsideredMobile)}/>
      </div>
    );
  }
}

const HomePageRoute = (props, isConsideredMobile) => {
    let pagePadding = isConsideredMobile ? mobilePagePadding : desktopPagePadding;
    return <HomePage isConsideredMobile={isConsideredMobile} pagePadding={pagePadding}/>
}

const ArtworkPageRoute = ({ match }, isConsideredMobile) => {
    let pagePadding = isConsideredMobile ? mobilePagePadding : desktopPagePadding;
    if(match.params && match.params.artworkNameSEO){
        return <ArtworkPage isConsideredMobile={isConsideredMobile} artworkNameSEO={match.params.artworkNameSEO} pagePadding={pagePadding}/>
    }else{
        return <BrowseArtworkPage isConsideredMobile={isConsideredMobile} pagePadding={pagePadding}/>
    }
}

PageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(PageContainer));