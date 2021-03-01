import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import tileData from './tileData';

const tileData = [
  {
  img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
  title: 'Alyce Bass',
  },
  {
  img: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82',
  title: 'Sabiha Plummer',
  featured: true,
  },
  {
    img: 'https://uifaces.co/our-content/donated/KtCFjlD4.jpg',
    title: 'Arthur Stewart',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    title: 'Hebe Harwood',
  },

  {
    img: 'https://uifaces.co/our-content/donated/n4Ngwvi7.jpg',
    title: 'Keanu Hood',
  },
  {
    img: 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg',
    title: 'Leonardo Davila',
  },
  {
    img: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350',
    title: 'Hayleigh Chapman',
  },
  {
    img: 'https://images.pexels.com/photos/1394499/pexels-photo-1394499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Reema English',
  },
  {
    img: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=f05c14dd4db49f08a789e6449604c490',
    title: 'Atticus Aldred',
  },
  {
    img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    title: 'Cobie Morin',
  },
  {
    img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=350',
    title: 'Corinne Mcghee',
  },
  {
    img: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&h=350',
    title: 'Ali Hendricks',
  },
];

const useStyles = makeStyles((theme) => ({
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


const OutfitGrid = () => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <GridList cellHeight={300}  spacing={30} className={classes.gridList}>
      <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
        <ListSubheader component="div"></ListSubheader>
      </GridListTile>
      {tileData.map((tile) => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            actionIcon={
              <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                <FavoriteIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
);
};

export default OutfitGrid;