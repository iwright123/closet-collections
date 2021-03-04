// import React, { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Button } from '@material-ui/core';

const Logs = () => {
  const [login, setLogin] = React.useState(false);
  console.log('logs', login)

  React.useEffect(() => {
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
            <Button onClick={() => logout()}>logout</Button>
          </div>
      }
    </div>
  );

};

export default Logs;