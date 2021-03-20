
import React, { DragEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';
import { title } from 'node:process';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const Home = (): ReactElement => {

  const [topOutfit, setTopOutFit] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(15);

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
  useEffect(() => {

    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));



  }, []);



  return (

    !images.length ? <h1>Loading</h1> :
      <>
        <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="small">Enlarge</ZoomInIcon>
          <ZoomOutIcon id='smaller' onClick={smaller} fontSize="small">Return Size</ZoomOutIcon></div>
        <h1>Top Rated Outfit </h1>
        <h4> {'This outfit has' + ' ' + images[0].likesCount + ' ' + 'likes' }</h4>
        <Box border={1}>
          <img src={
            images.sort((a, b) => b.likesCount - a.likesCount)[0].imageUrl}/>

          {console.log('images', images)}
        </Box>
        <h1>Suggested Outfit Of The Day</h1>
        <Box border={1}>
          <span><img src={images[random()].imageUrl}/></span>
        </Box>
        <Footer></Footer>
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
