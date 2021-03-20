import React, { useState, useEffect, EffectCallback } from 'react';
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
// import { getLikes } from 'server/helpers/Likes';
import Footer from './Footer';

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
  const [likes, setLike] = React.useState(0);
  const classes = useStyles();
  const [images, setImages] = React.useState([]);
  const [likeColor, setLikeColor] = React.useState(false);
  const [dislikeColor, setDislikeColor] = React.useState(false);
  const [state, setState] = React.useState<Message>({message: '', name: ''});
  const [comment, setComments] = React.useState([]);
  const [font, setFont] = useState(25);
  const [imgSize, setImgSize] = useState(15);
  const colorChange = { color: 'black'};
  const colorChange2 = { color: 'red'};
  const handleLikeClick = (e): void => {
    setLikeColor(!likeColor);
  };

  const onMessageSubmit = (e, outfitId): any => {
    e.preventDefault();
    const {message} = state;
    // console.log('state', state);
    return axios.post('/comment', {comment: message, postId: outfitId})
      .then(() => grabComments())
      .catch(err => console.log('err somewhere on message submit', err));
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
      .then(comments => setComments(comments.data))
      .then(data => console.log('this is after the comments are set in the grab comments', data))
      .catch(err => console.log('error getting comments', err));
  };
  const grabLikes = (id): Promise<any> => {
    return axios.get(`/likes/${id}`)
      .then(likes => {
        console.log('this is likes', likes.data[0].likesCount);
        setLike(likes.data[0].likesCount);
      })
      // .then(data => console.log('this is after the comments are set in the grab comments', data))
      .catch(err => console.log('error getting comments', err));
  };
  const updateLike = (id): Promise<any> => {

    return axios.patch(`/outfit/${id}`)
      .then((data) => {
        setLikeColor(!likeColor);
        getFits();
      })
      .catch(err => console.log('there was an error updating the like', err));
  };

  const getFits = (): Promise<any> => {
    return axios.get('/outfit')
      .then(({ data }) => setImages(data))

      .catch((err) => console.warn(err));
  };

  // useEffect(() => {
  //  return grabLikes(0);
  // }, []);
  useEffect(() => {
    getFits();
  }, []);
  useEffect(() => {
    axios.get('/comments')
      .then(comments => setComments(comments.data))
      .catch(err => console.log('err getting comments try 1', err));
  }, []);
  return (
    !images.length ? <h1>There Are No Top Outfits At This Time</h1> :
      <div className={classes.root}>
        <div id='zoompublic'><ZoomInIcon id='enlarge' onClick={larger} fontSize="small">Enlarge</ZoomInIcon>
          <ZoomOutIcon id='smaller' onClick={smaller} fontSize="small">Return Size</ZoomOutIcon></div>
        <br></br>

        {
          images.map((tile, i) => (
            <div id='comments' key={i}>
              <div>
                <h3 id='publicName'>{tile.user}</h3>
                <img src={tile.imageUrl} />
                <div id='publicactions'>
                  <Button
                    onClick={((id): Promise<any> => updateLike(tile.id))}
                    style={{
                      color: 'black'
                    }}
                  >
                    <ThumbUpIcon
                      className="buttonIcon"
                      style={{ fontSize: 15}}
                    />
                    <span>{tile.likesCount}</span>
                  </Button>
                  <Button id='displaymessage'style={{color: 'black'}} onClick={(): any => grabComments()}>
                    <MessageIcon
                      className="buttonIcon"
                      style={{ fontSize: 20 }}
                    />
                  </Button>

                </div>

              </div>
              <div id='lookhere'>
                <div id='sendcomment'>
                  <input type='text' value={state.message} name='message' placeholder='comment' onChange={handleCommentChange} />
                  <Button id='sending' type='submit' style={{color: 'black'}} value={tile.id} onClick={(e): any => onMessageSubmit(e, tile.id)}><SendIcon/></Button>

                </div>

                <ul>
                  {comment.map((comment, index) => {
                    if (Number(comment.postId) === tile.id || String(comment.postId) === tile.id) {
                      return <div key={index} id='commentsd'>
                        {`${comment.name}:    ${comment.comment}`}
                      </div>;

                    }
                  })}
                </ul>


              </div>
            </div>
          ) )}
      </div>
  );
};

export default OutfitGrid;
