import React, { ReactElement, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/IconButton';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import MessageIcon from '@material-ui/icons/Message';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SavedOutfits from '../Pages/SavedOutfits';

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


const OutfitGrid = (): ReactElement => {
  const classes = useStyles();
  //   const comment = (data: {}) => {
  // axios.post('/comment', data: {})
  // .then(data: {} => console.log(data))
  // .catch(err: {} => console.log('errror', err))
  //   }
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [favOutfits, setFavOutfits] = useState([]);
  const [page, setPage] = useState(false);
  //const [dislikeColor, setDislikeColor] = useState(false);

  const colorChange = { color: 'red'};
  //const colorChange2 = { color: 'red'};
  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  // const handleLikeClick = (input: number): void => {
  //   setLikeColor(!likeColor);
  // };
  const changeColor = liked ? 'red' : 'white';

  const favOutfit = (item): void => {
    setLiked(true);
    setFavOutfits([item.idUser, item.likes, item.comments]);
    const data = {
      idUser: item.idUser,
      likes: item.likes,
      comments: item.comments
    };

    axios.post('/whiteboardpost', data)
      .then((data: any) => console.log('Success', data))
      .catch((err: string) => console.warn('Error', err));
  };

  // const handleDislikeClick = () => {
  //   setDislikeColor(!dislikeColor);
  // };
  // const handleLikeClick = (e) => {
  //   setLikeColor(!likeColor);
  // };

  // const handleDislikeClick = (): void => {
  //   setDislikeColor(!dislikeColor);
  // };

  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className={classes.root}>
      <View>
        <Text>
          <h1>Outfits</h1>
        </Text>
        <TouchableOpacity onPress={(): void => setPage(true)}>
          <Text>
          Fav Outfits
          </Text>
        </TouchableOpacity>
        <div>
          <GridList cellHeight={300} spacing={10} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div"></ListSubheader>
            </GridListTile>

            {
              page === false ?
                images.map((tile, i) => {
                  return <View key={i}>
                    <GridListTile key={i}>
                      <Zoom>
                        <img src={tile.imageUrl} />
                      </Zoom>
                      <GridListTileBar
                        title={tile.title}
                        actionIcon={
                          <>
                            {/* <Button>
                <DeleteIcon
                className="buttonIcon"
                style={{ fontSize: 15 }}
                 />
              </Button> */}

                            <FavoriteIcon
                              className="buttonIcon"
                              style={{ fontSize: 15, color: changeColor}}
                              onClick={(): void => favOutfit(tile)}
                            />

                            {/* <Button
                    onClick={handleDislikeClick}
                    style={dislikeColor ? colorChange2 : null}
                    >
                    <ThumbDownIcon
                    className="buttonIcon"
                    style={{ fontSize: 15 }}
                    />
                  </Button> */}
                            <Button>
                              <MessageIcon
                                className="buttonIcon"
                                style={{ fontSize: 15 }}
                              />
                            </Button>
                          </>
                        }
                        key={String(i)}
                      />
                    </GridListTile>
                  </View>;

                }) :
                <View>
                  <ExitToAppIcon onClick={(): void => setPage(false)}/>
                  <SavedOutfits />
                </View>
            }
          </GridList>
        </div>
      </View>
    </div>
  );
};

export default OutfitGrid;
