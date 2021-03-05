
import React, { DragEvent, MouseEvent, useEffect, useState } from 'react';
//import Logs from '../logs/Login'
import * as axios from 'axios';
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
        <h1>This Should Be our Welcome Message or Title</h1>
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


    </div>
  );
};

export default Home;
