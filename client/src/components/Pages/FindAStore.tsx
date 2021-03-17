import React, { useState, } from 'react';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';
import Footer from './Footer';
interface findAStore{
  keyword: any
}
const findAStore = (): any => {
  const [keyword, setKeyword] = React.useState<string>();
  const [results, setResults] = React.useState([]);

  return (
    <div>
      <h1>Find A Store</h1>
      <SearchBar
        value={keyword}
        onChange={(e): void => setKeyword(e)}
      />
      <Button variant="contained" color="primary"
        onClick={(): void => {
          axios.get(`/api/search/${keyword}`)
            .then(({data}) => {
              console.log(data);
              setResults(data.businesses);
            }).catch(err => console.error(err));
        }}
      >Search
      </Button>
      <div className='stores'>
        {results.map((data:any, i:number) => {
          if (data) {
            return (
              <div key={String(i)}>
                <div key={String(i)}>
                  <h2> Name: {data.name}</h2>
                  <h3>Address: {data.location.address1} {data.location.city} {data.location.state} {data.location.zip_code}</h3>
                  <h3>Phone Number: {data.phone}</h3>
                  <h3>Rating: {data.rating}</h3>
                </div>
                <br></br>
              </div>
            );
          }
          return null;
        })}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default findAStore;
