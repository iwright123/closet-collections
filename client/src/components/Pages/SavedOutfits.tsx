import React, { ReactElement, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//     color: 'black'
//   },
//   gridList: {
//     width: 1000,
//     height: 1000,
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   icon: {
//     color: 'white',
//   }
// }));

const SavedOutfits = (): ReactElement => {
  // const classes = useStyles();
  const [outfit, setOutfits] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(false);
  const [clickedOutfit, setClickedOutfit] = useState([]);

  const display = (item):any => {
    setPage(true);
    setClickedOutfit([item.likes, item.comments]);
  };


  useEffect(() => {
    axios.get('/whiteboardpost/get')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="container">
      <View style={styles.container}>
        <h1>Outfits</h1>
        {
          page === false ?
            images.map((tile, i) => {
              return <View key={i}>
                <TouchableOpacity
                  onPress={(): any => display(tile)}>
                  <Image
                    source={{uri: tile.imageUrl}} />

                </TouchableOpacity>
              </View>;
            }) :
            <View style={styles.container}>
              <ExitToAppIcon onClick={():any => setPage(false)}/>
              {
                console.log(clickedOutfit)
              }
              <Image
                style={{width: 400, height: 330}}
                source={{uri: clickedOutfit[2]}} />
            </View>
        }
      </View>
    </div>
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
export default SavedOutfits;
