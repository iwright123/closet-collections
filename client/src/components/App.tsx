import * as React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Closet from './Pages/Closet';
import Calendar from './Calendar';
import OutfitGrid from './Pages/OutfitGrid';
// import GoogleButton from 'react-google-button';
import Logs from './logs/login';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { height } = Dimensions.get('screen');

const App = () => {

  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   axios.get('./isloggedin')
  //     .then(({ data }) => setLogin(data))
  //     .catch((err) => console.warn(err));
  // }, []);

  // const logout = () => {
  //   axios.delete('/logout')
  //     .then(({ data }) => setLogin(data))
  //     .catch(err => console.warn(err));
  // };

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
