import React, { useState, useRef } from "react";
import Picture from "./Picture";
import Logo1 from "./assets/404.gif";
import Logo2 from "./assets/4042error.gif";
import Logo3 from "./assets/Untitled.png";
import Logo4 from "./assets/loan.png";
import "./App.css";
import { useDrop } from "react-dnd";

interface Picture {
  id: number;
  src: string;
  x: number;
  y: number;
  name: string;
}

const PictureGrid: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([
    { id: 1, src: Logo1, x: 0, y: 0, name: "Picture 1" },
    { id: 2, src: Logo2, x: 1, y: 0, name: "Picture 2" },
    { id: 3, src: Logo3, x: 2, y: 0, name: "Picture 3" },
    { id: 4, src: Logo4, x: 0, y: 1, name: "Picture 4" },
    { id: 5, src: Logo1, x: 1, y: 1, name: "Picture 5" },
    { id: 6, src: Logo2, x: 2, y: 1, name: "Picture 6" },
    { id: 7, src: Logo3, x: 0, y: 2, name: "Picture 7" },
    { id: 8, src: Logo4, x: 1, y: 2, name: "Picture 8" },
    { id: 9, src: Logo1, x: 2, y: 2, name: "Picture 9" },
  ]);

  const picturesRef = useRef<Picture[]>(pictures);

  picturesRef.current = pictures;

  const pictureWidth = 100; // Width of each picture in pixels
  const pictureHeight = 100; // Height of each picture in pixels
  const numColumns = 3; // Number of columns in your grid

  const [, drop] = useDrop({
    accept: "PICTURE",
    drop: (item: { id: number }, monitor) => {
      const { id } = item;
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        const { x, y } = clientOffset;
        const droppedPictureIndex = picturesRef.current.findIndex(
          (picture) => picture.id === id
        );

        const droppedColumn = Math.floor(x / pictureWidth);
        const droppedRow = Math.floor(y / pictureHeight);
        const targetPictureIndex =
          droppedRow * numColumns + droppedColumn;

        if (
          droppedPictureIndex !== -1 &&
          targetPictureIndex !== -1 &&
          droppedPictureIndex !== targetPictureIndex
        ) {
          const newPictures = [...picturesRef.current];
          [newPictures[droppedPictureIndex], newPictures[targetPictureIndex]] =
            [newPictures[targetPictureIndex], newPictures[droppedPictureIndex]];

          console.log(
            `Dropped picture ID ${id} to position ${targetPictureIndex} (Row: ${droppedRow}, Column: ${droppedColumn})`
          );

          setPictures(newPictures);
        }
      }
    },
  });

  return (
    <div className="picture-grid" ref={drop}>
      {pictures.map((picture) => (
        <Picture
          key={picture.id}
          id={picture.id}
          src={picture.src}
          name={picture.name}
        />
      ))}
    </div>
  );
};

export default PictureGrid;
