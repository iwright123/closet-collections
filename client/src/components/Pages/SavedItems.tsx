import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Saved = () => {

  const [item, setItems] = React.useState([]);
  const [page, setPage] = React.useState(false);
  const [clickedItem, setClicked] = React.useState([]);

  const display = (item) => {
    setPage(true);

    setClicked([item.title, item.subTitle, item.imgUrl, item.releaseDate]);

  };


  React.useEffect(() => {
    axios.get('/calendar/get')
      .then(({ data }) => setItems(data))
      .catch((err) => console.warn(err));
  }, []);


  return (
    <>
      <View style={styles.container}>
        {

          page === false ?
            item.map((item, v) => {
              return <View
                key={v}>
                <TouchableOpacity
                  onPress={() => display(item)}>
                  <Image
                    style={{width: 185, height: 185, marginVertical: 2, marginLeft: 2}}
                    source={{uri: item.imgUrl}}
                  />
                </TouchableOpacity>
              </View>;
            }) :
            <View style={styles.container}>
              <ExitToAppIcon onClick={() => setPage(false)}/>
              {
                console.log(clickedItem)
              }
              <Image
                style={{width: 400, height: 330}}
                source={{uri: clickedItem[2]}} />
              <Text style={styles.itemInfo}>{clickedItem[0]}</Text>
              <Text style={styles.subItemInfo}>{clickedItem[1]}</Text>
              <Text>{clickedItem[3]}</Text>
            </View>
        }

      </View>
    </>
  );

};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  title: {
    fontSize: 25,
  },

  button: {
    backgroundColor: 'black'
  },

  itemInfo: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 50
  },

  subItemInfo: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 70
  },

  saved: {
    left: 0,
  }


});







export default Saved;
