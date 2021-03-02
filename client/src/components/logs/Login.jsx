import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import GoogleButton from 'react-google-button';
import { AppBar, Button } from '@material-ui/core';

const Logs = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);

  const logout = () => {
    axios.delete('/logout')
      .then(({ data }) => setLogin(data))
      .catch(err => console.warn(err));
  };


  return (
    <div>
      {
        login === false ?
          <div>
            <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
          </div>
          :
          <div>
            <Button
              className='Button'
              onClick={() => axios.delete('/logout')
                .then(({ data }) => this.logout(data))
                .catch((err) => console.warn(err))}
            >Logout</Button>
          </div>
      }
    </div>
  );

};

export default Logs;