import { useRef } from "react";
import Button from "./Button";
import bruteForce from "../logic/bruteforce";
// import aStarSearch from "../logic/astar";

const SolveButton = ({
  boardData,
  board,
  setBoard,
  isSolving,
  setIsSolving,
  isSolved,
  setIsSolved,
}) => {
  const boardRef = useRef(board);

  const updateBoardRef = (newBoard) => {
    boardRef.current = newBoard;
    setBoard(newBoard);
  };

  const solve = async () => {
    if (isSolved || isSolving) return;

    // Clearing the board
    const newBoard = board.clearConnections();
    updateBoardRef(newBoard);

    setIsSolving(true);
    const resultPath = bruteForce(boardData);
    // console.log(resultPath);

    const delay = 200;

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (resultPath) {
      setIsSolved(true);
      for (let i = 0; i < resultPath.length - 1; i++) {
        // console.log(i);
        const [nextRow, nextCol] = resultPath[i + 1];
        const [prevRow, prevCol] = resultPath[i];

        const currentBoard = boardRef.current;
        const updatedBoard = currentBoard.connectCell(nextRow, nextCol, [
          prevRow,
          prevCol,
        ]);
        updateBoardRef(updatedBoard);

        if (i === resultPath.length - 2) {
          setIsSolving(false);
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  return <Button color="green" onclick={solve} title="Solve" />;
};

export default SolveButton;
