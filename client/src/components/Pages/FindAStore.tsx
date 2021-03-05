import React, { useState, } from 'react';
import * as axios from 'axios';
import SearchBar from "material-ui-search-bar";

const findAStore = () => {
  const [keyword, setKeyword] = React.useState<string>();
  const [results, setResults] = useState([]);

  return (
    <div>
    <h1>Find A Store</h1>
    <SearchBar
      value={keyword}
      onChange={(e) => setKeyword(e)}
      //onRequestSearch={() => doSomethingWith(this.state.value)}
    />
  </div>
  );
}

export default findAStore;