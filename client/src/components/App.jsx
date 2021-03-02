import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Closet from './Pages/Closet.jsx';
import Calendar from './Calendar.tsx';
import OutfitGrid from './Pages/OutfitGrid.jsx';
import GoogleButton from 'react-google-button';
import Logs from './logs/login.jsx';

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
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/outfits' component={OutfitGrid} />
          <Route path='/closet' component={Closet} />
          <Route path='/logout' component={Logs} />
        </Switch>
      </Router>
    </>

  );

};

export default App;
