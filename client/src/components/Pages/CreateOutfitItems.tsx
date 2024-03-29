import useImage from 'use-image';
import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Image as KonvaImage, Group } from 'react-konva';
import { useHoverDirty, useLongPress } from 'react-use';

const CreateOutfitItems = ({ image, onDelete, onDragEnd }): ReactElement => {
  const imageRef = useRef(null);
  const isHovered = useHoverDirty(imageRef);
  const [stickerImage] = useImage(image.src, 'Anonymous');
  const [deleteImage] = useImage('cancel.svg');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const onLongPress = (): void => {
    setShowDeleteButton(true);
  };

  image.resetButtonRef.current = (): void => {
    setShowDeleteButton(false);
  };
  const longPressEvent = useLongPress(onLongPress, { delay: 200 });
  const [isDragging, setIsDragging] = useState(false);

  const stickerWidth = image.width;
  const stickerHeight = stickerImage
    ? (image.width * stickerImage.height) / stickerImage.width
    : 0;

  useEffect(() => {
    if (isHovered) {
      setShowDeleteButton(true);
    } else {
      setTimeout(() => {
        setShowDeleteButton(false);
      }, 2000);
    }
  }, [isHovered]);

  return (
    <Group
      draggable
      x={image.x}
      y={image.y}
      onDragStart={(): void => setIsDragging(true)}
      onDragEnd={(event): void => {
        setIsDragging(false);
        onDragEnd(event);
      }}
    >
      <KonvaImage
        crossOrigin="anonymous"
        ref={imageRef}
        width={image.width}
        height={stickerHeight}
        image={stickerImage}
        {...longPressEvent}
      />
      {showDeleteButton && !isDragging && (
        <KonvaImage
          crossOrigin="anonymous"
          onTouchStart={onDelete}
          onClick={onDelete}
          image={deleteImage}
          width={25}
          height={25}
          offsetX={-stickerWidth / 2 - 20}
        />
      )}
    </Group>
  );
};
export default CreateOutfitItems;
