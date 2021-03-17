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
import { items } from '../../../releaseData/calendarItems';

const Props = {
  items
};

const Calendar: React.FC = () => {

  const [notify, setNotify] = React.useState(false);
  const [favItems, setFaveItems] = React.useState([]);
  const [liked, setLike] = React.useState('');
  const [phone, setNumber] = React.useState('');
  // const [pushNotifications, setNotifications] = React.useState([]);
  const [page, setPage] = React.useState(true);
  const [fontTitle, setTitle] = React.useState(15);
  const [fontS, setSTitle] = React.useState(25);
  const [titleFont, setTitleFont] = React.useState(35);

  const push = (item): void => {
    setNotify(true);

    //setNotifications([item.title, item.Subtitle]);

    const message = {
      body: `You will receive a reminder for the ${item.title} ${item.subTitle}'s, Thank you!`
    };

    const post = {
      phoneNumber: '+15047235163',
      notification: `${item.title} ${item.subTitle}'s are releasing tomorrow!`,
      sendNotification: `${item.sendReminder}`,
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
    setTitleFont(40);
  };

  const smaller = (): any => {
    setTitle(15);
    setSTitle(20);
    setTitleFont(35);
  };


  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      fontSize: titleFont
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
