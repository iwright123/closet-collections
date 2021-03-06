
import React, { DragEvent, MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';



const Home = () => {
  const [topFits] = React.useState([])
// useEffect(() => {
// axios.get('/fits')
// }, [])
// const [trash] = React.useState([])

// useEffect(() => {
//   axios.get('/trash')
//   }, [])

  return (
    <div>

      <div>
        {/* <Logs /> */}
        <h1 id="welcome">Welcome to Closet Collection</h1>
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
