import React from 'react';
import Sidebar from './components/Sidebar.jsx'
import Home from './components/Home.jsx'
import Closet from './components/Closet.jsx'
import Outfits from './components/Outfits.jsx'
import Calendar from './components/Calendar.jsx'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
   <div className='App'>
     <Router>

<Sidebar />
<Switch>

</Switch>
     </Router>
   </div>
  );
}

export default App;
