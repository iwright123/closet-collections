import React, { createRef, useState, useEffect, useCallback } from "react";
import "./styles.css";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import CreateOutfitItems from './CreateOutfitItems';
import axios from 'axios';


function CreateOutfitWhiteBoard() {
  const [images, setImages] = useState([]);
  const [outfits, getOutfits] = useState([]);
  const stageRef = React.useRef<any>();
  const handleExportClick = () => {
		console.log(stageRef.current!.getStage().toDataURL({ mimeType: 'image/jpeg', quality: 1 }))
	}
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

  const handleCanvasClick = useCallback(
    (event) => {
      if (event.target.attrs.id === "backgroundImage") {
        resetAllButtons();
      }
    },
    [resetAllButtons]
  );
  useEffect(() => {
    axios.get('/items')
      .then(({ data }) => getOutfits(data))
      .catch((err) => console.warn(err))
  }, []);
  return (
    <div>
      <Stage
        width={600}
        height={400}
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
        ref={stageRef}
      >
        <Layer>
          {images.map((image, i) => {
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
            <img alt="item" src={outfit.imageUrl} width={75} />
          </button>
        );
      })}
        <div id="buttons"><button id="save" onClick={handleExportClick}>Save Outfit</button></div>
    </div>
  );
}
export default CreateOutfitWhiteBoard;