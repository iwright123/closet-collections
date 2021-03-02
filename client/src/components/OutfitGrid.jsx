// import React from 'react';


// const Outfits = () => {
//   return (
//     <div>
//       <h1>Outfits it worked!</h1>
//     </div>
//   );
// };

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
  img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJCm9NymqIf69NrW36uupqJStDBK_Toayo0Z915PvVTeWOaNJiWHWu5CcYT_GPoOT9920L_t-x40k&usqp=CAc',
  title: 'Christian Louboutin Pigalle Follies',
  },
  {
  img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ9LZukOBHX3rbUQNv-FigZ58LLrCPnHXgSHtxYgjWWhiP8YxNoclGWbFLZvpr-onxGgkTIPWXphjC4unsp92DRPnTA-ZUtyDgSTBQy0L0jugo_Yxj8OcCS&usqp=CAE',
  title: 'Spike-Sock Men Flat',
  featured: true,
  },
  {
    img: 'https://media.bergdorfgoodman.com/images/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/3684296_m/christian-louboutin-hot-chick-100mm-multi-patter',
    title: 'Stiletto Red Sole Pumps',
    featured: true,
  },
  {
    img: 'https://images.us.christianlouboutin.com/media/catalog/product/cache/1/thumbnail/1200x/602f0fa2c1f0d1ba5e241f914e856ff9/3/1/8/1/christianlouboutin-eloisebooty-3181297_BK01_1_1200x1200_1530528686.jpg',
    title: 'Eloise Booty',
  },

  {
    img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6hhq0ji4UGgHBo5ywRUMspwNPjCxoqwaHtsfAU1wDqwTHUoBd_qoCQgFQeXjzNmKJQL-jPUZZjw&usqp=CAc',
    title: 'Yeezy Boost 350',
  },
  {
    img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQYaoIe_w6jO_f5GbGjCg8Uss3waPgHvDKk1Speu3EVH-bk8UgH1XzO-9qtadVk6iOTHXof6LHhOwM&usqp=CAc',
    title: 'Yeezy Boost 350 V2',
  },
  {
    img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpp9A1Ldhg0g07gz7AF8y0e-_pAKb1xbzv2LaJ_HsNiOsEYXVJbVOnYrRkEiPSou5SeOH2t5th9w&usqp=CAc',
    title: 'Yeezy Clay Brown shoes',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTOTxBaxVufocLeFuIxsEMZU8f4sfV1R36au-XAZ0fStIi-Mqc8dx2XZaihtHsDxdHHcHsb4ZmlcFE&usqp=CAc',
    title: 'Nike Tye-Dye',
  },
  {
    img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR32CqnB1ZHeHwi0y-B29X3QRX3LAp12QO9CEoscRyvXn3ztHDMRych3-ZjgzQugaaEq5Yo3Cg-RcEq&usqp=CAc',
    title: 'Yeezy Foam RNNR',
  },
  {
    img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSdD7p9MjFzPkrfEXgiBrV_Qx3xCYg6oBbkrcG1UcsNOZOo_gilO3aOmXcDF_xqGeDiX0108oTgfMk&usqp=CAc',
    title: 'Air Jordan Off White',
  },
  {
    img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSatpZSqXWPXWq9CXsWTJuqykIJX0-9mfkHQqwZS7GutpCh2zkKz9ymliKRnn_4sNDDg-VLHoA6YME&usqp=CAc',
    title: 'Nike Air Max 90',
  },
  {
    img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTxQiitKWV4hzzepneb_nym5CI2D-hGDT9VG9Gnv7zM4k6qNtO4cV8MXdKjknFCTk0vcngtcUTexQ&usqp=CAc',
    title: 'Air Jordan 1 Retro x Balvin',
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
    <h1>Outfits</h1>
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

