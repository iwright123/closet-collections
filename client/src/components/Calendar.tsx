import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';



const items = [
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/ca0d4ca0-bf29-4e7c-811e-ee2a6219acdc/air-jordan-1-university-blue-release-date.jpg',
    title: 'Air Jordan 1',
    subTitle: 'University Blue'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/207e15e6-c6f5-4737-abd9-15bc0f19b0d3/womens-air-max-90-love-letter-release-date.jpg',
    title: 'Women Air Max 90',
    subTitle: 'Love Letter'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/5384f2ef-6cdf-4928-bb56-71d10bda3ee5/blazer-mid-x-readymade-black-release-date.jpg',
    title: 'Blazer Mid',
    subtitle: 'Ready Made'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/28179175-135b-4f40-b509-53445d7a7162/sb-dunk-high-x-carpet-company-royal-pulse-release-date.jpg',
    title: 'SB Dunk High',
    subTitle: 'Carpet Company'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/7a270b0d-fecd-41f3-8c74-77b4f0ed1aaf/dunk-high-dark-curry-release-date.jpg',
    title: 'Dunk High',
    subTitle: 'Dark Curry'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/c56710a9-d4a1-472b-b6e3-a4042d68dcae/dunk-low-city-market-release-date.jpg',
    title: 'Dunk Low',
    subTitle: 'City Market'
  }
]

interface Props {
  items: Object
}


const Calendar: React.FC<Props> = (props) => {

  return (
    <>

    </>
  );
};

export default Calendar;