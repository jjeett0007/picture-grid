// src/Picture.tsx
import React from "react";
import { useDrag } from "react-dnd";
import "./App.css";


interface PictureProps {
  id: number;
  src: string;
  name: string;
}

const Picture: React.FC<PictureProps> = ({ id, src, name }) => {
  const [, ref] = useDrag({
    type: "PICTURE",
    item: { id, type: "PICTURE" }, // Pass additional information about the picture
  });

  return (
    <div ref={ref} className="picture">
      <img src={src} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Picture;
