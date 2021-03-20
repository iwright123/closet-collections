
import React, { DragEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';
import { title } from 'node:process';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

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



  const random = (): number => {
    return Math.floor(Math.random() * images.length - 1);
  };
  useEffect(() => {

    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));



  }, []);



  return (

    // !images.length ? <h1>Loading</h1> :
    <>
      <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
      <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
      <Text style={styles.title}>Top Rated Outfit</Text>
      {/* <div>{'This outfit has' + ' ' + images[0].likesCount + ' ' + 'likes' }</div> */}
      {/* <img src={
        images[0].imageUrl}/> */}

      {console.log('images', images)}

      <h1>Suggested Outfit Of The Day</h1>
      {/* <span><img src={images[random()].imageUrl}/></span> */}

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
