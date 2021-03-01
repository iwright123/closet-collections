import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Homepage from '../Homepage.jsx';
import axios from 'axios'

const App = () => {
const [login, setLogin] = useState(false);

function isLoggedIn(){
  setLogin(login => login = !login)
}


  return (
    <div>
      <h1>MADE IT!</h1>
      <a onClick={isLoggedIn} className='loginButton' href="/auth/google"> <GoogleButton /></a>
      <Homepage />
    </div>

  );

};

export default App;
