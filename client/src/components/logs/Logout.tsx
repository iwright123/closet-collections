import * as React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const Logsout = () => {
  const [login, setLogin] = React.useState(false);

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
          <div>
            <button onClick={() => logout()}>logout</button>
          </div>
      }
    </div>
  );

};

export default Logsout;