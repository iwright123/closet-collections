import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import Saved from './Pages/SavedItems';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';


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
  },
  {
    img: 'https://i.ibb.co/8mKdjhY/supreme1.jpg',
    title: 'Hoodie',
    subTitle: 'Turquoise Supreme',
    release: 'March 20th, 2021'
  },
  {
    img: 'https://i.ibb.co/0VL79TM/supreme2.jpg',
    title: 'Peacock Jacket',
    subtitle: 'Supreme',
    release: 'March 20th, 2021'
  },
  {
    img: 'https://i.ibb.co/s6Z1DB6/givanchy1.jpg',
    title: 'Purple tight dress',
    subtitle: 'Givenchy',
    release: 'March 2, 2021'
  },
  {
    img: 'https://i.ibb.co/Nt7XL7H/medium-Antegona.jpg',
    title: 'Medium Antegona',
    subtitle: 'Givenchy handbag',
    release: 'September 1, 2021'
  },
  {
    img: 'https://i.ibb.co/vvXY4fF/celine-black1.jpg',
    title: 'Medium Triomphe',
    subtitle: 'Celine handbag',
    release: 'March 5, 2021'
  },
  {
    img: 'https://sneakernews.com/wp-content/uploads/2021/03/adidas-yeezy-foam-runner-sand-relaese-date.jpg?w=1140',
    title: 'Foam Runner',
    subtitle: 'Yeezys',
    release: 'March 26, 2021'
  }
];

const Props = {
  items
};

const Calendar: React.FC = () => {

  const [notify, setNotify] = React.useState(false);
  const [favItems, setFaveItems] = React.useState([]);
  const [liked, setLike] = React.useState('');
  const [phone, setNumber] = React.useState('');
  const [pushNotifications, setNotifications] = React.useState([]);
  const [page, setPage] = React.useState(true);
  const [form, setForm] = React.useState(false);
  const [remind, setRemind] = React.useState([]);
  const [fontTitle, setTitle] = React.useState(15);
  const [fontS, setSTitle] = React.useState(25);


  const push = (item): void => {
    setNotify(true);

    setNotifications([item.title, item.Subtitle]);

    const message = {
      body: `You will receive a reminder for the ${item.title} ${item.subTitle}'s, Thank you!`
    };

    const post = {
      username: 'anoy',
      phoneNumber: '+15047235163',
      notification: `${item.title} ${item.subTitle}'s are releasing tomorrow!`,
      timeZone: 'central',
      time: `${item.release}`
    };


    axios.post('/reminder', post)
      .then((data: any) => console.log(data) )
      .catch((err: string) => console.warn('Error here', err));

    axios.post('/sms', message)
      .then((data: any) => console.log(data) )
      .catch((err: string) => console.warn('Error here', err));
  };

  const favItem = (item): void => {

    // setLike(true);
    setLike('red');

    setFaveItems([item.title, item.subTitle, item.img, item.release]);

    const data = {
      title: item.title,
      subTitle: item.subTitle,
      imgUrl: item.img,
      releaseDate: item.release
    };

    axios.post('/calendar', data)
      .then((data: any) => console.log(data) )
      .catch((err: string) => console.warn('Error here', err));
  };



  const larger = (): any => {
    setTitle(40);
    setSTitle(35);
  };

  const smaller = (): any => {
    setTitle(15);
    setSTitle(20);
  };


  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      fontSize: 35
    },

    button: {
      backgroundColor: 'clear',
      marginVertical: -30
    },

    itemInfo: {
      flex: 1,
      fontSize: fontTitle,
      textAlign: 'center',
      marginVertical: -10
    },

    subItemInfo: {
      flex: 1,
      fontSize: fontS,
      textAlign: 'center',
      marginVertical: 10
    },

    saved: {
      left: 0,
    }

  });

  return (
    <>
      <View>
        {

          page === true ?
            <View style={styles.container}>
              <TouchableOpacity onPress={(): void => setPage(false)}>
                <Text>Fav Items</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={(): void => alert('Add your Number!')}>
                <Text>Add Number</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Upcoming Releases!</Text>
              <div>
                <ZoomInIcon onClick={larger} />
                <ZoomOutIcon onClick={smaller} />
              </div>

              {
                items.map((item, v) => {
                  return <View
                    key={v}>
                    <Image
                      style={{width: 250, height: 250, marginVertical: 10}}
                      source={{uri: item.img}}
                    />
                    <Text style={styles.itemInfo}>{item.title}</Text>
                    <Text style={styles.subItemInfo}>
                      <FavoriteBorderIcon style={{backgroundColor: liked}} onClick={(): void => favItem(item)} /> {item.subTitle}</Text>
                    <Button
                      onPress={(): void => push(item)}
                      title='Notify Me!'
                    />
                  </View>;
                })
              }
            </View> :
            <View>
              <ExitToAppIcon onClick={(): void => setPage(true)}/>
              <Saved />
            </View>

        }
      </View>
    </>
  );
};

export default Calendar;
