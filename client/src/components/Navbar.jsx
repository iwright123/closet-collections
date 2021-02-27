import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
    <div className ='navBar'>
  <Link to='#' className='menu-bars'>
    <FaIcons.FaBars/>
  </Link>
    </div>
    </>
  )
}

export default Navbar
