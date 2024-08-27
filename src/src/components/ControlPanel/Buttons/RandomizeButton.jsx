import React from "react";
import Button from "../../Button";
import difficultyData from "../../../data/difficulty";
import CreateBoard from "../../../class/CreateBoard";
import { isValidBoard } from "../../../logic/utils";

const RandomizeButton = ({ setBoardData, difficulty, isSolving }) => {
  const randomizeBoard = () => {
    if (isSolving) return;
    const newBoardData = new CreateBoard(
      difficultyData[difficulty].row,
      difficultyData[difficulty].col
    );

    newBoardData.randomize(difficultyData[difficulty].block);

    while (!isValidBoard(newBoardData.board)) {
      newBoardData.randomize(difficultyData[difficulty].block);
      console.log("Randomizing...");
    }
    setBoardData(newBoardData.board);
  };
  return <Button color="blue" onclick={randomizeBoard} title="Randomize" />;
};

export default RandomizeButton;
