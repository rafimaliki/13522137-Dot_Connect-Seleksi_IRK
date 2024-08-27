import React from "react";
import DifficultyButton from "./Buttons/DifficultyButton";
import ImportButton from "./Buttons/ImportButton";
import RandomizeButton from "./Buttons/RandomizeButton";
import SolveButton from "./Buttons/SolveButton";
import LogoutButton from "./Buttons/LogoutButton";
import ClearButton from "./Buttons/ClearButton";
import AlgorithmButton from "./Buttons/AlgorithmButton";
import ModeButton from "./Buttons/ModeButton";

const ControlPanel = ({ props }) => {
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
    difficulty,
    setDifficulty,
    emptyCells,
    setEmptyCells,
    mode,
    setMode,
    algorithm,
    setAlgorithm,
  } = props;
  return (
    <div className="w-36 h-[24rem] bg-white  box-shadow-lg rounded-lg flex flex-col items-center justify-between">
      {/* <h1 className=" w-full text-center font-extrabold text-green-700 mb-2">
        Dot Connect
      </h1> */}
      <div className="flex flex-col items-center my-2">
        <ModeButton mode={mode} setMode={setMode} isSolving={isSolving} />
        {true ? (
          <DifficultyButton
            setBoardData={setBoardData}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            isSolving={isSolving}
          />
        ) : null}
        {true ? (
          <RandomizeButton
            setBoardData={setBoardData}
            difficulty={difficulty}
            isSolving={isSolving}
          />
        ) : null}
        <ImportButton setBoardData={setBoardData} isSolving={isSolving} />
        {true ? (
          <AlgorithmButton
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            isSolving={isSolving}
          />
        ) : null}
      </div>
      <div className="flex flex-col items-center my-2">
        {true ? (
          <SolveButton
            boardData={boardData}
            board={board}
            setBoard={setBoard}
            isSolving={isSolving}
            setIsSolving={setIsSolving}
            isSolved={isSolved}
            setIsSolved={setIsSolved}
            setPrevIndex={setPrevIndex}
            algorithm={algorithm}
          />
        ) : null}
      </div>
      <div className="flex flex-col items-center my-2">
        <ClearButton
          isSolving={isSolving}
          boardData={boardData}
          setBoardData={setBoardData}
        />
        <LogoutButton />
      </div>
    </div>
  );
};

export default ControlPanel;
