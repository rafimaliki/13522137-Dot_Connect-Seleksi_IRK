import Button from "../../Button";
import { copyArray } from "../../../logic/utils";

const ClearButton = ({ isSolving, boardData, setBoardData }) => {
  const clearBoard = () => {
    if (isSolving) return;

    const newBoardData = copyArray(boardData);
    setBoardData(newBoardData);
  };

  return <Button color="red" onclick={clearBoard} title="Clear" />;
};

export default ClearButton;
