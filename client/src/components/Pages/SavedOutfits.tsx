import React, { ReactElement, useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    color: 'black'
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  }
}));

const SavedOutfits = (): ReactElement => {
  const classes = useStyles();
  const [outfit, setOutfits] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(false);
  const [clickedOutfit, setClickedOutfit] = useState([]);

  const display = (item) => {
    setPage(true);
    setClickedOutfit([item.likes, item.comments]);
  };


  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className={classes.root}>
      <View>
        <h1>Outfits</h1>
        <GridList cellHeight={300} spacing={10} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile>

          {
            page === false ?
              images.map((tile, i) => {
                return <View key={i}>
                  <GridListTile key={i}>
                    <img src={tile.imageUrl} />

                  </GridListTile>
                </View>;
              }) :
              <View>
                <ExitToAppIcon onClick={() => setPage(false)}/>

              </View>
          }
        </GridList>
      </View>
    </div>
  );
};
export default SavedOutfits;
