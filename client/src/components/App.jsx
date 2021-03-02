import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Sidebar from '../Sidebar.jsx';
import Nav from '../components/Nav.jsx'
import axios from 'axios'

const App = () => {
const [login, setLogin] = useState(false);

function isLoggedIn(){
  setLogin(login => login = !login)
}


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
            <h1>You are logged out</h1>
            <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
            <Nav />
          </div>
          :
          <div>
            <h1>You Are Logged In</h1>
            <Nav />
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
