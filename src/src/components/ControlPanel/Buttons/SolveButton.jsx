import { useRef } from "react";
import Button from "../../Button";

import astar from "../../../logic/astar";
import backtrack from "../../../logic/backtrack";
import greedy from "../../../logic/greedy";
import bruteforce from "../../../logic/bruteforce";
// import aStarSearch from "../logic/astar";

const algorithms = [astar, backtrack, greedy, bruteforce];

const SolveButton = ({
  boardData,
  board,
  setBoard,
  isSolving,
  setIsSolving,
  isSolved,
  setIsSolved,
  algorithm,
  setTimerActive,
}) => {
  const boardRef = useRef(board);

  const updateBoardRef = (newBoard) => {
    boardRef.current = newBoard;
    setBoard(newBoard);
  };

  const solve = async () => {
    if (isSolved || isSolving) return;
    setTimerActive(0);
    setTimerActive(1);

    // Clearing the board
    const newBoard = board.clearConnections();
    updateBoardRef(newBoard);

    setIsSolving(true);
    // const resultPath = astar(boardData);
    const resultPath = algorithms[algorithm](boardData);

    if (resultPath) {
      const delay =
        resultPath.length > 50
          ? Math.floor(2000 / resultPath.length)
          : Math.floor(1000 / resultPath.length);

      await new Promise((resolve) => setTimeout(resolve, delay));

      setIsSolved(true);
      console.log("Solution found");
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
    } else {
      console.log("No solution found");
      alert("No solution found");
      setIsSolving(false);
    }
    setTimerActive(2);
  };

  return <Button color="green" onclick={solve} title="Solve" />;
};

export default SolveButton;
