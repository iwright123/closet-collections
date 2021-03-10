
import React, { DragEvent, MouseEvent, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [topFits] = React.useState([]);

  // let _isMounted = false;

  // const [longitude, setLong] = React.useState(0);
  // const [latitude, setLat] = React.useState(0);
  // const [temp, setTemp] = React.useState('');
  // const [desc, setDesc] = React.useState('');


  // const getUserLocation = () => {
  //    //get user's ip address
  //    return axios.get('https://api.ipify.org')
  //    // get location data by ip address
  //      .then(({ data }) => axios.post('/api/location', { ip: data }))
  //      .then(({ data: { latitude, longitude } }) => {
  //        setLat(latitude)
  //        setLong(longitude)
  //        getWeatherByUserLocation(latitude, longitude);
  //      })
  //      .catch((err) => console.warn(err));
  // }

  // const getWeatherByUserLocation = (latitude, longitude) => {
  //   _isMounted = true;
  //   axios.post('/api/weather', { latitude, longitude })
  //     .then(({ data: { data } }) => {
  //       _isMounted = false;
  //       const { temp, weather } = data[0];
  //       const { description } = weather;
  //       const descriptionLowerCase = description.toLowerCase();
  //       // change temperature to fahrenheit
  //       let newTemp = Math.round(temp * (9 / 5) + 32);
  //       setTemp(`${newTemp}°F`)
  //       setDesc(descriptionLowerCase)
  //     }).catch((err: any) => console.warn(err));
  // }
  // useEffect(() => {
  // axios.get('/fits')
  // }, [])
  // const [trash] = React.useState([])

  // useEffect(() => {
  //   axios.get('/trash')
  //   }, [])

  // React.useEffect(() => {
  //   getUserLocation();
  // });

  return (
    <>

      <View style={styles.container}>
        <Text style={styles.title}>Closet Collections</Text>
        <View>
          {/* <Text style={styles.weather}>Currently {temp} and {desc}</Text> */}
        </View>
        <Image
          style={{width: 200, height: 200, marginVertical: 75}}
          source={{uri: 'https://media.gq.com/photos/5cf56d75ba72052c30a43177/master/w_1600%2Cc_limit/Chris-Bosh-Weigh-In-GQ-NBA-Most-Stylish-Player-Bracket-Kyrie-Irving.jpg'}}
        />
        <Text style={{marginVertical: -75}}>Top Rated by 87%</Text>

        <Image
          style={{width: 200, height: 200, marginVertical: 100}}
          source={{uri: 'https://media.gq.com/photos/5cf56d7609bcad6790fdd178/master/w_1600%2Cc_limit/Chris-Bosh-Weigh-In-GQ-NBA-Most-Stylish-Player-Bracket-Dwayne-Wade.jpg'}}
        />
        <Text style={{marginVertical: -100}}>Worst Rated by 93%</Text>

      </View>
      {/* <div>
        <div>
          <h1>This is the section where Top Outfits should be displayed</h1>
        </div>
        <div>
          <h1>This is the section where Worst Outfits should be displayed</h1>
        </div>
        <div>
          <h1>This is the section where suggested Outfits should be displayed</h1>
        </div>
      </div> */}
      <div className='footer'>
        <footer id="footer">
          <div className='footer-text'>
            Closet Collections
          </div>
          <div className='footer-text'>
            Since 2021
          </div>
        </footer>
      </div>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 30,
    marginVertical: 10
  },

  weather: {
    fontSize: 20
  }

});

export default Home;
