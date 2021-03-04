//import React, { useState } from 'react';
import * as React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
 import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';

const Navbar = () => {
  const [sidebar, setSidebar] = React.useState(false);

  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('/isloggedin')
    .then(({ data }) => setLogin(data))
    .catch(err => console.warn(err))
  });

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (

                <Link className='nav-text' key={index} to={item.link}>{item.icon}<span>{item.title}</span></Link>
              );
            })}
            {
              login === true ?
              <Link className='nav-text' to='/logout'><ExitToAppIcon />,<span>{'Logout'}</span></Link> :
              <Link className='nav-text' to='/login'><ExitToAppIcon />,<span>{'Login'}</span></Link>
            }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;