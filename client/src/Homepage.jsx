import React from 'react';
import Sidebar from './components/sidebar/Global.jsx';
import Home from './components/Home.jsx';
import Closet from './components/Closet.jsx';
import Outfits from './components/OutfitGrid.jsx';
import OutfitGrid from './components/OutfitGrid.jsx';
import Calendar from './components/Calendar.jsx';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className='App'>
      <h1>David Can You See me</h1>


      <Router>
      <Route path='/' exact component={Home} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/outfits' component={Outfits} />
        <Route path='/closet' component={Closet} />
      </Router>
    </div>
  );
};

export default Homepage;
