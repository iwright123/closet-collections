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
import SendIcon from '@material-ui/icons/Send';
import Message from '../models/Message';
import {io} from 'socket.io-client';
import Comments from './Comments';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
//import tileData from './tileData';
const socket = io('http://localhost:3000');
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
  const [state, setState] = React.useState<Message>({message: '', name: ''});
  const [comment, setComments] = React.useState([]);
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(15);

  const colorChange = { color: 'yellow'};
  const colorChange2 = { color: 'red'};

  const handleLikeClick = (e): void => {
    setLikeColor(!likeColor);
  };
  React.useEffect((): void => {
    socket.on('comment', ({name, message }) => {
      setComments([...comment, {name, message}]);
    });
  }, [state]);
  const onTextChange = (e): void => {
    setState({...state, [e.target.name]: e.target.value});
  };
  const onMessageSubmit = (e): void => {
    e.preventDefault();
    const {name, message} = state;
    socket.emit('message', {name, message});
    setState({message: '', name});
  };
  // const handleDislikeClick = (): void => {
  //   setDislikeColor(!dislikeColor);
  // };

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


    !images.length ? <h1>Loading</h1> :
      <div className={classes.root}>
        <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
        <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
        <h1 style={{fontSize: font}}>Outfits</h1>
        {
          images.map((tile, i) => (
            // <GridListTile key={i}>
            <div id='comments'>
              <h3>{tile.user}</h3>
              <img src={tile.imageUrl} />
              <Button
                onClick={((): void => console.log('button clicked'))}
                style={likeColor ? colorChange : null}
              >
                <ThumbUpIcon
                  className="buttonIcon"
                  style={{ fontSize: 15}}
                />

              </Button>
              <Comments></Comments>
              <Button>
                <MessageIcon
                  onClick={(): void => console.log('nothing')}
                  className="buttonIcon"
                  style={{ fontSize: 15 }}
                />
              </Button>
            </div>
          ) )}
      </div>
  );
};

export default OutfitGrid;
