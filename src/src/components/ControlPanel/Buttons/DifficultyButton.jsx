import React from "react";
import Button from "../../Button";
import difficultyData from "../../../data/difficulty";
import CreateBoard from "../../../class/CreateBoard";

const DifficultyButton = ({
  setBoardData,
  difficulty,
  setDifficulty,
  isSolving,
  setScore,
  timerActive,
}) => {
  const changeDifficulty = () => {
    if (isSolving || timerActive === 1) return;
    let newDifficulty = (difficulty + 1) % difficultyData.length;
    const newBoard = new CreateBoard(
      difficultyData[newDifficulty].row,
      difficultyData[newDifficulty].col
    ).board;

    setDifficulty(newDifficulty);
    setBoardData(newBoard);
    setScore(0);
  };
  return (
    <Button
      color="blue"
      onclick={changeDifficulty}
      title={difficultyData[difficulty].level}
    />
  );
};

export default DifficultyButton;
