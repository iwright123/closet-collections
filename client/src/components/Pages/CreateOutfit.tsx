import React, { DragEvent, MouseEvent } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ImageUrl from '../models/ImageUrl';
import * as $ from 'jquery';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
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


  return (
    <div>
     Create Your Outfit
      <br />
      <img
        height="150px"
        width="150px"
        alt="boot"
        src="https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw59062d66/images/a_1205/170588C_A_1205X1.jpg?sw=964"
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
          width={window.innerWidth}
          height={window.innerHeight}
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
    </div>
  );;
};

render(<CreateOutfit />, document.getElementById('root'));


export default CreateOutfit;





