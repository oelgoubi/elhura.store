import React, {Component} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

const authService = require('../../services/auth');

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      sidebar : false,
      showAvatar : null
    };

  }

  showSidebar = () => {
    this.setState({
      sidebar : !this.state.sidebar
    })
  }

  componentDidMount() {
    this.isUserAuthenticated()
  }

  async isUserAuthenticated() {
    const isUserAuthenticated = await authService.isUserAuthenticated();

    this.setState({
      showAvatar: isUserAuthenticated
    })
  }

  render() {
    const { showAvatar } = this.state;
    return (
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={this.showSidebar} />
              </Link>
              { showAvatar != null && (showAvatar === true &&
                <Link to='#' className='avatar'>
                  <FaIcons.FaUserCircle onClick=""/>
                </Link>)
              }
            </div>
            <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={this.showSidebar}>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
    );
  }
}

export default Navbar;
