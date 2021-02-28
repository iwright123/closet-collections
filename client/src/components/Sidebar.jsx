import React, {useState} from 'react';
import ReorderIcon from '@material-ui/icons/Reorder';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'
import {SidebarData} from './SidebarData.jsx'
import { IconContext } from 'react-icons'

function Sidebar(){
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
return (
  <>
  <IconContext.Provider value={{color: 'white'}}>
  <div className='sidebar'>
    <Link to='#' className='menu-bars'>
      <ReorderIcon />
    </Link>

  </div>
  <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
    <ul className='nav-menu-item' onClick={showSidebar}>
      <li className='navbar-toggle'>
        <Link to='#' className='menu-bars'>
            <CloseIcon onClick={showSidebar}/>
        </Link>
      </li>
      {SidebarData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to='item.link'>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
  </IconContext.Provider>
  </>
)
}
export default Sidebar