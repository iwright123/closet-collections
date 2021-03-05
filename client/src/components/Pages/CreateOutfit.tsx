import React, { DragEvent, MouseEvent, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ImageUrl from '../models/ImageUrl';
import Outfit from '../models/Outfit';
import $ from 'jquery';
import axios from 'axios'

const URLImage = ({ image }) => {
  const [img] = useImage(image.imageUrl, 'Anonymous');
  return (
    <Image
    crossOrigin="anonymous"
      image={img}
      x={image.x}
      y={image.y}
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

 const [outfits, getOutfits] = React.useState<Outfit[]>([]);


  useEffect(() => {
    axios.get('/items')
      .then(({ data }) => getOutfits(data))
      .catch((err) => console.warn(err))
  }, []);
console.log(outfits);
  return (
    <div>
     Create Your Outfit
      <br />
      {
        outfits.map((outfit, i) => {
         return <img
        crossOrigin="anonymous"
        height="75px"
        width="75px"
        key={String(i)}
        alt="dress"
        draggable="true"
        src={outfit.imageUrl}
        onDragStart={(event: DragEvent) => {
          const imageSrc = $('img').attr('src');
          if (dragUrl){
            dragUrl.current = imageSrc;
            console.log('line 118', dragUrl.current)
          }
        }}
      />
        })
      }

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
            console.log('line 101', images)
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
            {images.map((image, i) => {
              return <URLImage image={image} key={String(i)}/>;
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





