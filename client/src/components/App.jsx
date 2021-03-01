import React from 'react';
import GoogleButton from 'react-google-button';
import Homepage from '../Homepage.jsx';

const App = () => {

  return (
    <div>
      <h1>MADE IT!</h1>
      <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
      <Homepage />
    </div>

  );

};

export default App;
