import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Homepage from '../Homepage.jsx';
import axios from 'axios';
import LoggedOut from './sidebar/MenuLoggedOut.jsx';
import LoggedIn from './sidebar/MenuLoggedIn.jsx';
import Calendar from './Calendar.jsx';
import Closet from './Closet.jsx';
import Outfits from './OutfitGrid.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {

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
          <div className='App'>
            <LoggedIn />
            <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
            <Router>
              {/* <Route path='/' exact component={Home} /> */}
              <Route path='/calendar' component={Calendar} />
              <Route path='/outfits' component={Outfits} />
              <Route path='/closet' component={Closet} />
            </Router>
          </div>
          :
          <div>
            <div className='App'>
              <LoggedIn />
              <button onClick={() => logout()}>Logout</button>
            </div>

          </div>
      }
    </div>
  );
};

export default App;
