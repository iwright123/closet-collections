import React, { DragEvent, MouseEvent } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import type { Stage as StageType } from 'konva/types/Stage'
import useImage from 'use-image';
import ImageUrl from '../models/ImageUrl';
import * as $ from 'jquery';

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

const URLImage = ({ image }) => {
  const [img] = useImage(image.src, 'Anonymous');
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const CreateOutfit = () => {
  const dragUrl = React.useRef<any>();
  const stageRef = React.useRef<any>();
  console.log(stageRef, dragUrl);
  const [images, setImages] = React.useState<ImageUrl[]>([]);

  const handleExportClick = () => {
		console.log(stageRef.current!.getStage().toDataURL({ mimeType: 'image/jpeg', quality: 1 }))
	}


  return (
    <div>
     Create Your Outfit
      <br />
      <img
        crossOrigin="anonymous"
        height="150px"
        width="150px"
        alt="dress"
        src="https://i.s-madewell.com/is/image/madewell/AF169_BR0040_ld?wid=500&hei=635&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0"
        draggable="true"
        onDragStart={(event: DragEvent) => {
          const imageSrc = $('img').attr('src');
          console.log(imageSrc)
          if (dragUrl){
            dragUrl.current = imageSrc;


          }

        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          console.log(stageRef);
          if (stageRef && stageRef.current) {
            stageRef.current.setPointersPositions(e);

          }
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth/2}
          height={window.innerHeight/2}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
      <div id="buttons"><button id="save" onClick={handleExportClick}>Save Outfit</button></div>
    </div>
  );;
};

render(<CreateOutfit />, document.getElementById('root'));


export default CreateOutfit;





