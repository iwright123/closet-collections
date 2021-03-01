import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Homepage from '../Homepage.jsx';
import axios from 'axios';

const App = () => {

  const [login, setLogin] = useState(false);

  console.info('flag 1', login);

  useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .then(console.info('flag2', login))
      .catch((err) => console.warn(err));

  }, []);

  return (
    <div>
      {
        login === false ?
          <div>
            <h1>MADE IT!</h1>
            <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
            <Homepage />
          </div>
          :
          <div>
            <h1>MADE IT!</h1>
            <Homepage />
            <button
              onClick={() => axios.delete('/logout')
                .then(({ data }) => setLogin(data))
                .catch(err => console.warn(err))}
            >Logout</button>
          </div>
      }
    </div>

  );

};

export default App;
