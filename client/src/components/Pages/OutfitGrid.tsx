import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { Icon } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';

//import tileData from './tileData';

interface IPost {
  userId: number;
  id?: number;
  title: string;
  body: string;
}
const defaultProps:IPost[] = [];
const useStyles = makeStyles((theme: { palette: { background: { paper: any; }; }; }) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    color: 'black',
    paddingBottom: 60
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


const OutfitGrid = (): any => {
  const classes = useStyles();
  //   const comment = (data: {}) => {
  // axios.post('/comment', data: {})
  // .then(data: {} => console.log(data))
  // .catch(err: {} => console.log('errror', err))
  //   }
  const [images, setImages] = React.useState([]);
  const [likeColor, setLikeColor] = React.useState(false);
  const [dislikeColor, setDislikeColor] = React.useState(false);
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(15);

  const colorChange = { color: 'yellow'};
  const colorChange2 = { color: 'red'};

  const handleLikeClick = (e): void => {
    setLikeColor(!likeColor);
  };

  const handleDislikeClick = (): void => {
    setDislikeColor(!dislikeColor);
  };

  const larger = (): any => {
    setFont(40);
    setImgSize(40);
  };
  const smaller = (): any => {
    setFont(25);
    setImgSize(15);
  };

  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className='main container'>


      <div className={classes.root}>
        <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
        <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
        <div></div>
        <h1 style={{fontSize: font}}>Outfits</h1>

        <GridList cellHeight={300} spacing={10} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile>
          {
            images.map((tile, i) => (

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
                      {/* <Button
                    onClick={((): void => handleLikeClick(i))}
                    style={likeColor ? colorChange : null}
                  >
                    <ThumbUpIcon
                      className="buttonIcon"
                      style={{ fontSize: imgSize}}

                    />
                  </Button>
                  <Button
                    onClick={handleDislikeClick}
                    style={dislikeColor ? colorChange2 : null}
                  >
                    <ThumbDownIcon
                      className="buttonIcon"
                      style={{ fontSize: imgSize }}
                    />
                  </Button> */}
                      <Button>
                        <MessageIcon
                          className="buttonIcon"
                          style={{ fontSize: imgSize }}
                        />
                      </Button>
                    </>
                  }
                  key={String(i)}
                />
              </GridListTile>

            ))}
        </GridList>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default OutfitGrid;
