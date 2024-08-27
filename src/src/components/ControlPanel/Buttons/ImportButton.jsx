import { React, useRef } from "react";
import Button from "../../Button";

const ImportButton = ({ setBoardData, isSolving }) => {
  const fileInputRef = useRef(null);

  const handleFileImport = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          validateAndStoreData(data);
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
      setBoardData(board);
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
          if (!isSolving) {
            fileInputRef.current.click();
          }
        }}
        title="Import"
      />
    </>
  );
};

export default ImportButton;
