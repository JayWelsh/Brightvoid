import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Router, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BrightvoidLogo from '../img/BrightvoidLogoFlat.png';
import {configureHistory, isPrefixWWW} from '../utils';
import PageContainer from './PageContainer';

let endpointGraphQL = "https://brightvoid.com/graphql";
if(isPrefixWWW()){
  endpointGraphQL = "https://www.brightvoid.com/graphql";
};
console.log("endpointGraphQL",endpointGraphQL);

const sizeConsiderMobile = 600;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  }
});

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
  },
  list: {
    width: 250,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }
};

const history = configureHistory()

class AppRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false
        };
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
  render() {
    const { classes } = this.props;
    const { anchor } = this.state;
    let isConsideredMobile = false;
    const documentBodyClientWidth = document.body.clientWidth;
    if ((documentBodyClientWidth <= sizeConsiderMobile)) {
      isConsideredMobile = true;
      if (anchor === "left" && (anchor !== "right")) {
        this.setState({ anchor: "right" });
      }
    }else if(anchor === "right" && (anchor !== "left")){
      this.setState({ anchor: "left" });
    }
    const sideList = (
        <div className={classes.list}>
          <List>
            {['Home'].map((text, index) => (
              <Link to={'/'} className={"no-decoration"} key={text}>
              <ListItem button>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Artwork'].map((text, index) => (
              <Link to={'/artwork'} className={"no-decoration"} key={text}>
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
        </div>
      );
  return (
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
            <AppBar className={"our-gradient"} position="static">
                <Toolbar>
                <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <div className={"header-logo full-width"}>
                  <Link to={'/'} className={"no-decoration"}>
                    <img alt="Brightvoid Logo" src={BrightvoidLogo} />
                  </Link>
                </div>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
              <PageContainer isConsideredMobile={isConsideredMobile} />
            </main>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}
}

AppRoot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppRoot);