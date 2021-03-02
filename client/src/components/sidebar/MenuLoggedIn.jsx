import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { useDetectOutsideClick } from './UseDetectOutsideClick.jsx';
import GoogleButton from 'react-google-button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const LoggedIn = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   axios.get('./isloggedin')
  //     .then(({ data }) => setLogin(data))
  //     .catch((err) => console.warn(err));
  // }, []);

  // const logout = () => {
  //   axios.delete('/logout')
  //     .then(({ data }) => setLogin(data))
  //     .catch(err => console.warn(err));
  // };

  return (
    <Router>
      <div className="container">
        <div className="menu-container">
          <button onClick={onClick} className="menu-trigger">
            <span>User</span>
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
          </button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? 'active' : 'inactive'}`}
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to='/outfit'>Outfits</Link>
              </li>
              <li>
                <Link to="/calendar">Calendar</Link>
              </li>
              <li>
                <Link to="/closet">Closet</Link>
              </li>
            </ul>
            <ul>
              <li>
                {/* <button onClick={() => logout()}>Logout</button> */}
              </li>
            </ul>

          </nav>
        </div>
      </div>
    </Router>
  );
};

export default LoggedIn;