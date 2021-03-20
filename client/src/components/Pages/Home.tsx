
import React, { DragEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';
import { title } from 'node:process';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';
import { AnyPtrRecord } from 'node:dns';

const Home = (): ReactElement => {

  let _isMounted = false;

  const [topOutfit, setTopOutFit] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(15);

  const [longitude, setLong] = React.useState(0);
  const [latitude, setLat] = React.useState(0);
  const [temp, setTemp] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const getUserLocation = (): any => {
    //get user's ip address
    return axios.get('https://api.ipify.org')
    // get location data by ip address
      .then(({ data }) => axios.post('/api/location', { ip: data }))
      .then(({ data: { latitude, longitude } }) => {

        setLat(latitude);
        setLong(longitude);

        getWeatherByUserLocation(latitude, longitude);

      }).catch((err) => console.warn(err));
  };


  const getWeatherByUserLocation = (latitude, longitude): any => {
    _isMounted = true;
    axios.post('/api/weather', { latitude, longitude })
      .then(({ data: { data } }) => {
        _isMounted = false;
        const { temp, weather } = data[0];
        const { description } = weather;
        const descriptionLowerCase = description.toLowerCase();
        // change temperature to fahrenheit
        const newTemp = Math.round(temp * (9 / 5) + 32);

        setTemp(`${newTemp}°F`);
        setDesc(descriptionLowerCase);

      }).catch((err) => console.warn(err));
  };


  const larger = (): any => {
    setFont(40);
    setImgSize(40);
  };

  const smaller = (): any => {
    setFont(25);
    setImgSize(15);
  };

  const topRated = (): any => {
    return images.sort((a, b) => b.likesCount - a.likesCount);
  };

  const random = (): number => {
    return Math.floor(Math.random() * images.length - 1);
  };

  React.useEffect(() => {
    getUserLocation();
  });




  useEffect(() => {

    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));

  }, []);



  return (

    !images.length ? <h1>Loading</h1> :

      <View style={styles.container}>
        <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
        <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
        <Text>Currently {temp} and {desc}</Text>      
        <Text style={styles.title}>Top Rated Outfit</Text>
        <Text>{`This outfit has ${images.sort((a, b) => b.likesCount - a.likesCount)[0].likesCount} likes` }</Text>

        <img src={
          images.sort((a, b) => b.likesCount - a.likesCount)[0].imageUrl}/>

        <Text>Suggested Outfit Of The Day</Text>
        <span><img src={images[random()].imageUrl}/></span>
        <Footer></Footer>
      </View>
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
