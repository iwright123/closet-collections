import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const Saved = () => {

  const [item, setItems] = React.useState([]);


  React.useEffect(() => {
    axios.get('/calendar/get')
      .then(({ data }) => setItems(data))
      .catch((err) => console.warn(err))
  }, [])


return (
 <>
  <View style={styles.container}>
    {/* <Text style={styles.title}>Favorites</Text> */}
    {
        item.map((item, v) => {
        return <View
          key={v}>
            <TouchableOpacity
             onPress={() => <Link to='/info'></Link>}>
              <Image
              style={{width: 185, height: 185, marginVertical: 2, marginLeft: 2}}
              source={{uri: item.imgUrl}}
            />
            </TouchableOpacity>
            {/* <Text style={styles.itemInfo}>{item.title}</Text>
            <Text style={styles.subItemInfo}>{item.subTitle}</Text>
            <Text>{item.releaseDate}</Text> */}
          </View>
        })
      }

  </View>
 </>
)

}

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
};

const routes = () => {

  return (
    <Router>
      <Switch>
      <Route path='/info' component={DetailsScreen} />
      </Switch>
    </Router>
  )

};



const Stack = createStackNavigator();

const screen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Saved' component={Saved} options={{ title: 'Saved'}} />
        <Stack.Screen name='details' component={DetailsScreen} options={{ title: 'details'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  },

  title: {
    fontSize: 25,
  },

  button: {
    backgroundColor: 'black'
  },

  itemInfo: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: -10
  },

  subItemInfo: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10
  },

  saved: {
    left:0,
}


});







export default Saved;