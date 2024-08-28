import { React, useRef } from "react";
import Button from "../../Button";
import { size } from "lodash";

// possible row, col
const possibleSize = [
  [5, 5],
  [8, 6],
  [10, 6],
  [12, 8],
];

const ImportButton = ({
  setBoardData,
  isSolving,
  setDifficulty,
  setScore,
  timerActive,
}) => {
  const fileInputRef = useRef(null);

  const handleFileImport = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          validateAndStoreData(data);
          setScore(0);
        } catch (error) {
          alert("Invalid JSON format");
        }
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
    event.target.value = null;
  };

  const validateAndStoreData = (data) => {
    const { board } = data;

    if (
      Array.isArray(board) &&
      board.every(
        (row, _, arr) =>
          Array.isArray(row) &&
          row.length > 0 &&
          row.length === arr[0].length &&
          row.every((num) => typeof num === "number" && num >= 0)
      )
    ) {
      const rows = board.length;
      const cols = board[0].length;

      const sizeIndex = possibleSize.findIndex(
        ([r, c]) => r === rows && c === cols
      );

      if (sizeIndex !== -1) {
        setBoardData(board);
        setDifficulty(sizeIndex);
      } else {
        alert("Invalid board size.");
      }
    } else {
      alert("Invalid board data.");
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileImport}
        style={{ display: "none" }}
      />
      <Button
        color="blue"
        onclick={() => {
          if (!isSolving && timerActive !== 1) {
            fileInputRef.current.click();
          }
        }}
        title="Import"
      />
    </>
  );
};

export default ImportButton;
