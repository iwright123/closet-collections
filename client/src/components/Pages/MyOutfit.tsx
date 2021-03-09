import React, { ReactElement, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import axios from 'axios';
import UsersOutfits from '../models/UsersOutfits';
import ImageUrl from '../models/ImageUrl';
import ListSubheader from '@material-ui/core/ListSubheader';
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
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MyOutfit = (): ReactElement => {
  const classes = useStyles();
  //   const comment = (data: {}) => {
  // axios.post('/comment', data: {})
  // .then(data: {} => console.log(data))
  // .catch(err: {} => console.log('errror', err))
  //   }
  const [images, setImages] = useState([]);
  useEffect((): void => {
    axios.get<UsersOutfits[]>('/outfit/:user')
      .then(({ data }): void => setImages(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className={classes.root}>
      <h1>Outfits</h1>
      <GridList cellHeight={300} spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {images.map((tile: ImageUrl) => (
          <GridListTile key={tile.imageUrl}>
            <Zoom>
              <img src={tile.imageUrl} />
            </Zoom>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MyOutfit;
