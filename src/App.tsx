// import { useState } from "react";

import PictureGrid from "./grid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <PictureGrid />
      </DndProvider>
    </>
  );
}

export default App;
