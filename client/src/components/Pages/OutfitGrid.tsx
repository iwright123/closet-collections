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
    color: 'white'
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

  const colorChange = { color: 'yellow'};
  const colorChange2 = { color: 'red'};

  const handleLikeClick = (e): void => {
    setLikeColor(!likeColor);
  };

  // const handleDislikeClick = (): void => {
  //   setDislikeColor(!dislikeColor);
  // };
  const handleComment = (e): any => {
    console.log('e', e.target.className);
    return;
  };

  useEffect(() => {
    axios.get('/outfit')
      .then(({ data }) => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (


    !images.length ? <h1>Loading</h1> :
    // <div>
    //   {console.log('images', images)}
    //   <h1>Why does this work!</h1>
    //   <div>
    //     <ul>
    //         {images.map((image, index) => {
    //       <li>

    //           <h1>hello</h1>;


    //       </li>
    //         })}

    //     </ul>

    //   </div>






    //   <div>

    //   </div>
    // </div>


      <div>
        {/* <GridList cellHeight={300} spacing={10} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile> */}
        {
          images.map((tile, i) => (

            // <GridListTile key={i}>
            <div id='comments'>
              <h3>{tile.user}</h3>

              <img src={tile.imageUrl} />

              <Button
                onClick={((): void => handleLikeClick(i))}
                style={likeColor ? colorChange : null}
              >
                <ThumbUpIcon
                  className="buttonIcon"
                  style={{ fontSize: 15}}

                />

              </Button>
              <Button>
                <MessageIcon
                  onClick={handleComment}
                  className="buttonIcon"
                  style={{ fontSize: 15 }}
                />
              </Button>
              <div id='comment'>
                <ul id='commentList'>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                </ul>
              </div>

            </div>
            //   <GridListTileBar
            //     title={tile.title}
            //     actionIcon={
            //       <>
            //         <Button>
            //           <DeleteIcon
            //             className="buttonIcon"
            //             style={{ fontSize: 15 }}
            //           />
            //         </Button>
            //         <Button
            //           onClick={((): void => handleLikeClick(i))}
            //           style={likeColor ? colorChange : null}
            //         >
            //           <ThumbUpIcon
            //             className="buttonIcon"
            //             style={{ fontSize: 15}}

            //           />

            //         </Button>
            //         <Button
            //           onClick={handleDislikeClick}
            //           style={dislikeColor ? colorChange2 : null}
            //         >
            //           <ThumbDownIcon
            //             className="buttonIcon"
            //             style={{ fontSize: 15 }}
            //           />
            //         </Button>
            //         <Button>
            //           <MessageIcon
            //             className="buttonIcon"
            //             style={{ fontSize: 15 }}
            //           />
            //         </Button>


            //       </>
            //     }
            //     key={String(i)}
            //   />


            // </GridListTile>

          ))}

        {/* //</div></GridList>
      </div> */}

      </div>

  );
};

export default OutfitGrid;
