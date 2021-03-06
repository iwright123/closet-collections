import * as React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

const items = [
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/ca0d4ca0-bf29-4e7c-811e-ee2a6219acdc/air-jordan-1-university-blue-release-date.jpg',
    title: 'Air Jordan 1',
    subTitle: 'University Blue',
    release: 'March 6th, 2021'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/207e15e6-c6f5-4737-abd9-15bc0f19b0d3/womens-air-max-90-love-letter-release-date.jpg',
    title: 'Women Air Max 90',
    subTitle: 'Love Letter',
    release: 'March 3rd, 2021'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/5384f2ef-6cdf-4928-bb56-71d10bda3ee5/blazer-mid-x-readymade-black-release-date.jpg',
    title: 'Blazer Mid',
    subTitle: 'Ready Made',
    release: 'March 3rd, 2021'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/28179175-135b-4f40-b509-53445d7a7162/sb-dunk-high-x-carpet-company-royal-pulse-release-date.jpg',
    title: 'SB Dunk High',
    subTitle: 'Carpet Company',
    release: 'March 12th, 2021'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/7a270b0d-fecd-41f3-8c74-77b4f0ed1aaf/dunk-high-dark-curry-release-date.jpg',
    title: 'Dunk High',
    subTitle: 'Dark Curry',
    release: 'March 5th, 2021'
  },
  {
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/c56710a9-d4a1-472b-b6e3-a4042d68dcae/dunk-low-city-market-release-date.jpg',
    title: 'Dunk Low',
    subTitle: 'City Market',
    release: 'March 4th, 2021'
  }
]

export interface Props {
  items: object
}

const Calendar: React.FC = () => {

  const [notify, setNotify] = React.useState<boolean>(false);
    // or can be React.useState(false);
  const [favItems, setFaveItems] = React.useState([]);

    const favItem = async (item) => {

      setFaveItems([item.title, item.subTitle, item.img, item.release])

      const data = {
        title: item.title,
        subTitle: item.subTitle,
        imgUrl: item.img,
        releaseDate: item.release
      }

      await axios.post('/calendar', data)
      .then((data: any) => console.log(data) )
      .catch((err: string) => console.warn('Error here', err))
    }

  return (
    <>
    <View
      style={styles.container}>
      <Text style={styles.title}>Upcoming Releases!</Text>
      {
        items.map((item, v) => {
        return <View
          key={v}>
            <Image
              style={{width: 250, height: 250, marginVertical: 10}}
              source={{uri: item.img}}
            />
            <Text style={styles.itemInfo}>{item.title}</Text>
            <Text style={styles.subItemInfo}>{item.subTitle}</Text>
            {/* <Text>{item.release}</Text> */}
            <FavoriteBorderIcon onClick={() => favItem(item)} />
            <Button
              onPress={() => setNotify(true)}
              title='Notify Me!'
            />
          </View>
        })
      }
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 35
  },

  button: {
    backgroundColor: 'black'
  },

  itemInfo: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: -10
  },

  subItemInfo: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10
  }


});

export default Calendar;