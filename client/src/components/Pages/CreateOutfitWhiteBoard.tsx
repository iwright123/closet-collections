import React, { createRef, useState, useEffect, useCallback } from "react";
import "./styles.css";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import CreateOutfitItems from './CreateOutfitItems';
import axios from 'axios';
import $ from 'jquery';


function CreateOutfitWhiteBoard() {

  const [images, setImages] = useState([]);
  const [outfits, getOutfits] = useState([]);
  const stageRef = React.useRef<any>();
  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/geonovember/upload';

  const handleExportClick = () => {
    const baseUrl = stageRef.current!.getStage().toDataURL({ mimeType: 'image/png', quality: 1 })

    let data = {
      "file": baseUrl,
      "upload_preset": "smiuh98k"
    }
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(r => {
      axios.post('/outfit', r)
    }).catch(err => console.log(err))
  };


  const addStickerToPanel = ({ src, width, x, y }) => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        resetButtonRef: createRef()
      }
    ]);
  };

  const resetAllButtons = useCallback(() => {
    images.forEach((image) => {
      if (image.resetButtonRef.current) {
        image.resetButtonRef.current();
      }
    });
  }, [images]);


  useEffect(() => {
    axios.get('/items')
      .then(({ data }) => getOutfits(data))
      .catch((err) => console.warn(err))
  }, []);
  return (
    <div>
      <Stage
        width={400}
        height={400}
        ref={stageRef}
      >
        <Layer>
          {images.map((image, i) => {
             $('img').attr('crossOrigin', 'anonymous')
            return (
              <CreateOutfitItems
                onDelete={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event) => {
                  image.x = event.target.x();
                  image.y = event.target.y();
                }}
                key={i}
                image={image}
              />
            );
          })}
        </Layer>
      </Stage>
      <h4 className="heading">Click/Tap to add item to outfit!</h4>
      {outfits.map((outfit, i) => {
        return (
          <button
            key={i}
            className="button"
            onMouseDown={() => {
              addStickerToPanel({
                src: outfit.imageUrl,
                width: 75,
                x: 100,
                y: 100
              });
            }}
          >
            <img alt="item" src={outfit.imageUrl} width={75} crossOrigin="anonymous"/>
          </button>
        );
      })}
        <div id="buttons"><button id="save" onClick={handleExportClick}>Save Outfit</button></div>
    </div>
  );
}
export default CreateOutfitWhiteBoard;