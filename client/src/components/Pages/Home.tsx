import * as React from 'react';
import GoogleButton from 'react-google-button'
import axios from 'axios';

const Home = () => {
  const [login, setLogin] = React.useState(false);
  React.useEffect(() => {
    axios.get('/isloggedin')
    .then(({ data }) => setLogin(data))
    .catch(err => console.log('err', err))
  }, [])
  return (
    <div>
          {

<div>
  <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
</div>
// :

}
      <div>
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
