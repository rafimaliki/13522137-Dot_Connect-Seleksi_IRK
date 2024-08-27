import { React, useEffect } from "react";

import BoardRow from "./BoardRow";
import BoardData from "../../class/BoardData";
import { countEmptyCells } from "../../logic/utils";
import CreateBoard from "../../class/CreateBoard";
import difficultyData from "../../data/difficulty";

const Board = ({ props }) => {
  const {
    boardData,
    setBoardData,
    board,
    setBoard,
    dragging,
    setDragging,
    prevIndex,
    setPrevIndex,
    isSolving,
    setIsSolving,
    isSolved,
    setIsSolved,
    emptyCells,
    setEmptyCells,
    mode,
    setMode,
    difficulty,
  } = props;

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
    };
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    console.log(emptyCells);
  }, [emptyCells]);

  useEffect(() => {
    const newBoard = new BoardData(boardData);
    setBoard(newBoard);
    setPrevIndex(newBoard.startIndex);
    setEmptyCells(countEmptyCells(boardData));
    setIsSolved(false);
  }, [boardData]);

  // useEffect(() => {
  //   let row, col;
  //   if (mode === 0) {
  //     row = difficultyData[difficulty].row;
  //     col = difficultyData[difficulty].col;
  //   } else {
  //     row = difficultyData[0].row;
  //     col = difficultyData[0].col;
  //   }

  //   const newBoard = new CreateBoard(row, col).board;

  //   setBoardData(newBoard);
  // }, [mode]);

  return (
    <>
      <div className="bg-white box-shadow-lg rounded-lg m-6">
        {board.cells.map((row, index) => (
          <BoardRow
            key={index}
            row={row}
            board={board}
            setBoard={setBoard}
            dragging={dragging}
            setDragging={setDragging}
            prevIndex={prevIndex}
            setPrevIndex={setPrevIndex}
            emptyCells={emptyCells}
            setEmptyCells={setEmptyCells}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
