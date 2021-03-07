import * as React from 'react';

import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Closet from './Pages/Closet';
import Calendar from './Calendar';
import OutfitGrid from './Pages/OutfitGrid';
import FindAStore from './Pages/FindAStore';
// import GoogleButton from 'react-google-button';
import Logs from './logs/login';
import Logsout from './logs/Logout'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MyOutfit from '../components/Pages/MyOutfit'
const { height } = Dimensions.get('screen');
const axios = require('axios');
const App = () => {

  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);

  // const logout = () => {
  //   axios.delete('/logout')
  //     .then(({ data }) => setLogin(data))
  //     .catch(err => console.warn(err));
  // };

   return (
    <>
    {
      login === false ?
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/outfits' component={OutfitGrid} />
          <Route path='/closet' component={Closet} />
          <Route path='/findastore' component={FindAStore} />
          <Route path='/login' component={Logs} />
        </Switch>
      </Router>
      :
      <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/outfits' component={OutfitGrid} />
        <Route path='/closet' component={Closet} />
        <Route path='/chat' component={Chat} />
        <Route path='/findastore' component={FindAStore} />
        <Route path='/logout' component={Logsout} />
      </Switch>
    </Router>

    }
    </>
  );
};

export default App;
