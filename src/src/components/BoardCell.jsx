import React, { useMemo } from "react";
import colors from "../data/color";

const BoardCell = ({
  data,
  board,
  setBoard,
  dragging,
  setDragging,
  prevIndex,
  setPrevIndex,
}) => {
  const { type, color, row, col, adjacent, connections } = data;
  const isBlocked = type === "blocked";
  const cellShape = isBlocked ? "rounded-none" : "rounded-full";
  const size = isBlocked ? "w-6 h-6" : "w-7 h-7";

  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isBlocked) {
      if (type === "start" || connections === 1) {
        setPrevIndex([row, col]);
      } else {
        connectCell(prevIndex);
      }
      setDragging(true);
    }
  };

  const handleMouseEnter = () => {
    if (dragging) {
      connectCell(prevIndex);
    }
  };

  const connectCell = (prevIndex) => {
    const newBoard = board.connectCell(row, col, prevIndex);
    if (newBoard) {
      setBoard(newBoard);
      setPrevIndex([row, col]);
    }
  };

  const memoizedContent = useMemo(() => {
    // console.log("Rendering", row, col);
    return (
      <>
        <div
          className={`z-10 relative ${size} ${cellShape}`}
          style={{ backgroundColor: colors[color] }}
        ></div>
        {adjacent.top && (
          <div
            className="absolute w-[8px] h-[10px] top-0"
            style={{ backgroundColor: colors[color] }}
          ></div>
        )}
        {adjacent.right && (
          <div
            className="absolute w-[10px] h-[8px] right-0"
            style={{ backgroundColor: colors[color] }}
          ></div>
        )}
        {adjacent.bottom && (
          <div
            className="absolute w-[8px] h-[10px] bottom-0"
            style={{ backgroundColor: colors[color] }}
          ></div>
        )}
        {adjacent.left && (
          <div
            className="absolute w-[10px] h-[8px] left-0"
            style={{ backgroundColor: colors[color] }}
          ></div>
        )}
      </>
    );
  }, [connections]);

  return (
    <div
      className="relative w-10 h-10 flex justify-center items-center"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      {memoizedContent}
    </div>
  );
};

export default BoardCell;
