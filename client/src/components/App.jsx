import React from 'react';
import Navbar from './Navbar.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const App = () => {

  return (
<>
<Router>
  <Navbar />
  <Switch>
    <Route path='/' />
  </Switch>
</Router>
</>
  );

};

export default App;
