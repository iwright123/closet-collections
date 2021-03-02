import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { useDetectOutsideClick } from './UseDetectOutsideClick.jsx';
import GoogleButton from 'react-google-button';
import axios from 'axios';

const LoggedOut = () => {
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
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/outfits">Outfit</a>
            </li>
            <li>
              <a href="/calendar">Calendar</a>
            </li>
            <li>
              <a href="/closet">Closet</a>
            </li>
          </ul>
          <ul>
            <li>
              {/* <a className='loginButton' href="/auth/google"> <GoogleButton /></a> */}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LoggedOut;
