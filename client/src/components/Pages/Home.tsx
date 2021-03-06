
import React, { DragEvent, MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';



const Home = () => {
  const [topFits] = React.useState([])

  let _isMounted = false;

  const [longitude, setLong] = React.useState(0);
  const [latitude, setLat] = React.useState(0);
  const [temp, setTemp] = React.useState('');
  const [desc, setDesc] = React.useState('');


  const getUserLocation = () => {
     //get user's ip address
     return axios.get('https://api.ipify.org')
     // get location data by ip address
       .then(({ data }) => axios.post('/api/location', { ip: data }))
       .then(({ data: { latitude, longitude } }) => {
         setLat(latitude)
         setLong(longitude)
         getWeatherByUserLocation(latitude, longitude);
       })
       .catch((err) => console.warn(err));
  }

  const getWeatherByUserLocation = (latitude, longitude) => {
    _isMounted = true;
    axios.post('/api/weather', { latitude, longitude })
      .then(({ data: { data } }) => {
        _isMounted = false;
        const { temp, weather } = data[0];
        const { description } = weather;
        const descriptionLowerCase = description.toLowerCase();
        // change temperature to fahrenheit
        let newTemp = Math.round(temp * (9 / 5) + 32);
        setTemp(`${newTemp}°F`)
        setDesc(descriptionLowerCase)
      }).catch((err: any) => console.warn(err));
  }
// useEffect(() => {
// axios.get('/fits')
// }, [])
// const [trash] = React.useState([])

// useEffect(() => {
//   axios.get('/trash')
//   }, [])

    React.useEffect(() => {
      getUserLocation();
    });

  return (
    <div>

      <div>
        <h1 id="welcome">Welcome to Closet Collection</h1>
      </div>
      <div>
        <h1><div className="weather">Currently {temp} and {desc}</div></h1>
      </div>
      <div>
        <div>
          <h1>This is the section where Top Outfits should be displayed</h1>
        </div>
        <div>
          <h1>This is the section where Worst Outfits should be displayed</h1>
        </div>
        <div>
          <h1>This is the section where suggested Outfits should be displayed</h1>
        </div>
      </div>
      <div className='footer'>
        <footer id="footer">
          <div className='footer-text'>
            Closet Collection
          </div>
          <div className='footer-text'>
            Since 2021
          </div>
        </footer>
          </div>
    </div>
  );
};

export default Home;
