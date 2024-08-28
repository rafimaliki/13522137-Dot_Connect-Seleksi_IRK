import React, { useMemo, useState, useEffect, useRef } from "react";
import colors from "../../data/colors";

const BoardCell = ({
  data,
  board,
  setBoard,
  dragging,
  setDragging,
  prevIndex,
  setPrevIndex,
  emptyCells,
  setEmptyCells,
  timerActive,
}) => {
  const { type, color, row, col, adjacent, connections } = data;
  const isBlocked = type === "blocked";
  const cellShape = isBlocked ? "rounded-none" : "rounded-full";
  const size = isBlocked ? "w-7 h-7" : "w-8 h-8";

  const cellRef = useRef(null);

  const handleMouseDown = (event) => {
    event.preventDefault();
    if (timerActive !== 1) return;
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
      setEmptyCells((prev) => prev - 1);
    }
  };

  const memoizedContent = useMemo(() => {
    return (
      <>
        <div
          ref={cellRef}
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
  }, [connections, color]);

  useEffect(() => {
    const currentCell = cellRef.current;

    if (currentCell) {
      currentCell.classList.add("animate-ping-once");

      const handleAnimationEnd = () => {
        currentCell.classList.remove("animate-ping-once");
      };

      currentCell.addEventListener("animationend", handleAnimationEnd);

      return () => {
        if (currentCell) {
          currentCell.removeEventListener("animationend", handleAnimationEnd);
        }
      };
    }
  }, [connections, color]);

  return (
    <div
      className="relative w-12 h-12 flex justify-center items-center"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      {memoizedContent}
    </div>
  );
};

export default BoardCell;
