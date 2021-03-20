import * as React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Button } from '@material-ui/core';

const Logs = (): React.ReactElement => {
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);


  const logout = (): void => {
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
            <Button onClick={(): void => logout()}>logout</Button>
          </div>
      }
    </div>
  );

};

export default Logs;
