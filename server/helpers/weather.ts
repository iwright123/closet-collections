const axios = require('axios');

export const getWeatherByGeoLocation = (latitude, longitude) => {

  const url = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_TOKEN}`;

  return axios.get(url)
    .then(({ data }) => data)
    .catch((err) => console.error(err));

}