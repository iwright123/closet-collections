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
import { Icon, IconButton } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import Message from '../models/Message';
import {io} from 'socket.io-client';
// import Comments from './Comments';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { title } from 'node:process';

//import tileData from './tileData';
const socket = io('http://localhost:3000');
interface IPost {
  postId: number;
  id?: number;
  title: string;
  body: string;
}
interface postId {
  number: number
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
  const onMessageSubmit = (e): void => {
    e.preventDefault();
    const {message} = state;
    axios.post('/comment', {comment: message});

  };
  const handleCommentChange = (e): void => {
    console.log(e.target.value);
    setState({...state, [e.target.name]: e.target.value});
  };

  const larger = (): any => {
    setFont(40);
    setImgSize(40);
  };
  const smaller = (): any => {
    setFont(25);
    setImgSize(15);
  };
  const grabComments = (): Promise<any> => {
    return axios.get('/comments')
      .then(({data}) => setComments(data))
      .then(data => console.log(comment, data))
      .catch(err => console.log('error getting comments', err));
  };
  const submitComment = (comment): Promise<any> => {
    return axios.post('/comment', comment)
      .then(data => console.log('This came back from Posting a comment:', data))
      .catch(err => console.log('Error submitting comment', err));
  };
  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))

      .catch((err) => console.warn(err));
  }, []);
  useEffect(() => {
    axios.get('/comments')
      .then(comments => setComments(comments.data))
      .catch(err => console.log('err getting comments try 1', err));
  }, [comment]);
  return (
    !images.length ? <h1>Loading</h1> :
      <div className={classes.root}>
        <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
        <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
        <h1 style={{fontSize: font}}>Outfits</h1>
        {
          images.map((tile, i) => (
            <div id='comments' key={i}>
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
              <Button onClick={(): any => grabComments()}>
                <MessageIcon
                  className="buttonIcon"
                  style={{ fontSize: 15 }}
                />
              </Button>
              <div id='lookhere'>
                <input type='text' value={state.message} name='message' placeholder='comment' onChange={handleCommentChange} />
                <button type='submit' onClick={onMessageSubmit}>SendComment</button>

                <ul>
                  {comment.map((comment, index) => {
                    return <div key={index}>
                      {comment.id}
                      {comment.name}
                      {comment.comment}
                    </div>;

                  })}
                </ul>;


              </div>
            </div>
          ) )}
      </div>
  );
};

export default OutfitGrid;
