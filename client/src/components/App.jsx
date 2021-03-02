import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
<<<<<<< HEAD
import Sidebar from '../Sidebar.jsx';
import Nav from '../components/Nav.jsx'
import axios from 'axios'
=======
import Homepage from '../Homepage.jsx';
import axios from 'axios';
import LoggedOut from './sidebar/MenuLoggedOut.jsx';
import LoggedIn from './sidebar/MenuLoggedIn.jsx';
import Calendar from './Calendar.jsx';
import Closet from './Closet.jsx';
import Outfits from './OutfitGrid.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
>>>>>>> c76dc0fa39bc2bf47a9fa507d6174244de12e9fe

const App = () => {
const [login, setLogin] = useState(false);

function isLoggedIn(){
  setLogin(login => login = !login)
}


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
<<<<<<< HEAD
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
=======
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

>>>>>>> c76dc0fa39bc2bf47a9fa507d6174244de12e9fe
          </div>
      }
    </div>
  );
};

export default App;
