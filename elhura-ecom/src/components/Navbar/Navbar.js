import React, {Component} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, withRouter} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { withStyles } from "@material-ui/core/styles";
import { navbar } from "./Styles/NavbarStyles";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {createBrowserHistory} from 'history';
import {AppBar, Button, FormControl, Input, InputLabel, Toolbar} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../resources/images/logo.jpg";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const authService = require('../../services/auth');
const userService = require('../../services/user');

export const history = createBrowserHistory({forceRefresh:true});

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar : false,
      anchorEl : null
    };
  }

  handleUserCircleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  handleUserCircleClose = () => {
    this.setState({
      anchorEl: null
    })
  };

  showSidebar = () => {
    this.setState({
      sidebar : !this.state.sidebar
    })
  }

  componentDidMount() {

  }

  async logout() {
    await authService.logout();
    history.push("/");
  }

  menuItems() {
    let sideBarData = SidebarData
    if (this.props.isAuthenticated !== null && this.props.isAuthenticated) {
      sideBarData = sideBarData.filter(item => (item.show.authenticated === true && (item.showToUser.includes(this.props.userRole) || item.showToUser.includes(-1))))
    } else if (this.props.isAuthenticated !== null && !this.props.isAuthenticated) {
      sideBarData = sideBarData.filter(item => item.show.unauthenticated === true)
    } else if(this.props.isAuthenticated === null) {
      sideBarData = sideBarData.filter(item => item.show.unauthenticated === true)
    }
    return sideBarData.map((item, index) => {
      return (<li key={index} className={item.cName}>
        <Link to={item.path !== '/logout' ? item.path : '#'} onClick={item.path !== '/logout' ? '' : this.logout}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>)
    })
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={this.showSidebar} />
              </Link>
              {(this.props.isAuthenticated !== null && this.props.userRole === 2) && (<div>
                <AppBar className={classes.appBar} position="static">
                  <Toolbar>
                    <Typography className={classes.name} variant="h6">
                      Elhura
                    </Typography>
                    <Link to={"/articles"} className={classes.link}>
                      <Typography variant="body2">
                        Articles
                      </Typography>
                    </Link>
                    <Link to={"/categories"} className={classes.link}>
                      <Typography variant="body2">
                        Categories
                      </Typography>
                    </Link>
                    <Link to={"/articles/add"} className={classes.link}>
                      <Typography variant="body2">
                        Add
                      </Typography>
                    </Link>
                  </Toolbar>
                </AppBar>
              </div>)}
              { this.props.isAuthenticated != null && (this.props.isAuthenticated === true &&
                <div>
                  <Link to='#' className='avatar'>
                    <FaIcons.FaUserCircle aria-describedby="user-circle-popover" onClick={this.handleUserCircleClick}/>
                  </Link>
                  <Popover
                    id="user-circle-popover"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleUserCircleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                      horizontal: "center"
                    }}
                  >
                    <Typography className={classes.typography} onClick="">Profile</Typography>
                  </Popover>
                </div>
                )
              }
            </div>
            <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={this.showSidebar}>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {this.menuItems()}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
    )}
}

export default withRouter(withStyles(navbar)(Navbar));
