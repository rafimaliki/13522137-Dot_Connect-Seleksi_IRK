import { React, useState } from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardData from "../class/BoardData";

const boardData1 = [
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 2, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const boardData2 = [
  [1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 4, 0, 0],
  [2, 4, 3, 0, 1],
  [3, 0, 0, 0, 2],
];

const boardData3 = [
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 2, 1, 0, 0],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
];

const boardData4 = [
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const boardData5 = [
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const boardData6 = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 2, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],
];

const boardData7 = [
  [2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
const boardData8 = [
  [2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const boardData = boardData1;

const GamePage = () => {
  const [board, setBoard] = useState(new BoardData(boardData));

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 font-mono">
      <Board boardData={boardData} board={board} setBoard={setBoard} />
    </div>
  );
};

export default GamePage;
