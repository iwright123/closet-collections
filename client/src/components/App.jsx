import React from 'react';
import GoogleButton from 'react-google-button';

const App = () => {

  return (
    <div>
      <h1>MADE IT!</h1>
      <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
    </div>

  );

};

export default App;
