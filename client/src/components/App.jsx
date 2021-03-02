import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Homepage from '../Homepage.jsx';
import Navbar from './Navbar.jsx'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Closet from './Pages/Closet.jsx'
import Calendar from './Pages/Calendar.jsx'
import OutfitGrid from '../components/Pages/OutfitGrid.jsx'
const App = () => {
// const [login, setLogin] = useState(false);

// function isLoggedIn(){
//   setLogin(login => login = !login)
// }


//   const [login, setLogin] = useState(false);

//   useEffect(() => {
//     axios.get('./isloggedin')
//       .then(({ data }) => setLogin(data))
//       .catch((err) => console.warn(err));
//   }, []);

//   const logout = () => {
//     axios.delete('/logout')
//       .then(({ data }) => setLogin(data))
//       .catch(err => console.warn(err));
//   };

  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/outfits' component={OutfitGrid} />
        <Route path='/closet' component={Closet} />
      </Switch>
    </Router>
  </>

  );
};

export default App;
