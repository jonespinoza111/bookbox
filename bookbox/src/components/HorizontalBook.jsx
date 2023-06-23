import React, { useState } from "react";
import Draggable from "react-draggable";

const HorizontalBook = ({ id, title, author, thumbnail, rank, books, updateBooks, bookPositions, setBookPositions }) => {
  const [deltaY, setDeltaY] = useState(0);
  const [currentRank, setCurrentRank] = useState(rank);


  const handleDrag = (event, data) => {
    const newPosition = { x: bookPositions[id].x, y: bookPositions[id].y + data.deltaY };
    setDeltaY(data.deltaY)
    setBookPositions((prevPositions) => ({
      ...prevPositions,
      [id]: newPosition
    }));
  };

  const calculateClosestPosition = (y, multiple) => {
    let closest_multiple = Math.round(y / multiple) * multiple
    return closest_multiple
  };

  const closestMultiple = (y, multiple) => {
    let closest_multiple = Math.round(y / multiple) * multiple
    return closest_multiple
  }

  const calculateNewRank = (deltaY) => {
    console.log('getting new rank');
    return (closestMultiple(deltaY) / 256) + 1;
  };

  const calculateNewPosition = () => {

  }
  const handleDragStop = (event, data) => {
    console.log('the current rank ', rank);
    console.log('this is the data here ', data);
    console.log('this is the closest y value of ', calculateClosestPosition(data.lastY, 256));

    console.table('all this positions ', bookPositions);


    let newY = calculateClosestPosition(data.lastY, 256)
    let displacedBook = books.filter(book => book.id !== id).find(book => (book.rank - 1) * 256 == newY);

    console.log('displaced book now ', displacedBook);

    let newRank = displacedBook && 
    setBookPositions((prevPositions) => ({ ...prevPositions, [id]: { x: 0, y: newY } }));

    if (displacedBook && newY > bookPositions[id].y) {
      setBookPositions((prevPositions) => ({
        ...prevPositions,
        [displacedBook.id]: { x: 0, y: prevPositions[displacedBook.id].y - 256 }
      }))
    } else if (displacedBook && newY < bookPositions[id].y) {
      setBookPositions((prevPositions) => ({
        ...prevPositions,
        [displacedBook.id]: { x: 0, y: prevPositions[displacedBook.id].y + 256 }
      }))
    }
    // const updatedBooks = [];

    // Update the positions of the books in the parent component's state
    // updateBooks(updatedBooks);
  };
  return (
    <Draggable
      axis="y"
      position={bookPositions[id]}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div className="flex bg-white w-full rounded-lg shadow-md h-[16em]">
        <div className="w-1/3 h-[16em]">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="flex flex-col justify-center px-2">
          <h2
            className="text-lg font-medium text-gray-800 truncate"
            title={title}
          >
            {title}
          </h2>
          <p className="text-sm text-gray-600 truncate" title={author}>
            {author}
          </p>
        </div>
      </div>
    </Draggable>
  );
};

export default HorizontalBook;
