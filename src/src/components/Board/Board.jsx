import { React, useEffect } from "react";

import BoardRow from "./BoardRow";
import BoardData from "../../class/BoardData";
import { countEmptyCells } from "../../logic/utils";
import CreateBoard from "../../class/CreateBoard";
import difficultyData from "../../data/difficulty";
import countScore from "../../logic/scoring";

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
    timerActive,
    setTimerActive,
    player,
    setPlayer,
    playerList,
    setPlayerList,
    score,
    setScore,
    time,
    apiInstance,
  } = props;

  // handle mouse up event
  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
    };
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // cek apakah board sudah selesai
  useEffect(() => {
    // console.log(emptyCells);
    if (emptyCells === 0) {
      setIsSolved(true);
      setTimerActive(2);
    }
  }, [emptyCells]);

  // update data saat selesai
  useEffect(() => {
    if (isSolved) {
      console.log("Solved!!");
      var scoreIndex;
      if (difficulty === 0) scoreIndex = 0;
      else if (difficulty === 1) scoreIndex = 1;
      else if (difficulty === 2) scoreIndex = 2;
      else if (difficulty === 3) scoreIndex = 3;

      if (mode === 1) scoreIndex += 4;

      const cscore = countScore(difficulty, mode, time);
      setScore(cscore);

      console.log({
        pemain: player,
        waktu: time,
        skor: cscore,
        mode: mode,
        difficulty: difficulty,
      });

      const playerUpdated = player.setHighscore(scoreIndex, cscore);
      if (playerUpdated) {
        setPlayer(playerUpdated);
        console.log("New highscore");
      } else {
        console.log("Highscore not updated");
        return;
      }
      const playerListUpdated = playerList.updatePlayerData(player);
      if (playerListUpdated) {
        setPlayerList(playerListUpdated);
        console.log("PlayerList updated");
        apiInstance.post(playerListUpdated.players);
      } else {
        console.log("PlayerList not updated");
        return;
      }
    }
  }, [isSolved]);

  // hitung ulang board saat ganti data
  useEffect(() => {
    const newBoard = new BoardData(boardData);
    setBoard(newBoard);
    setPrevIndex(newBoard.startIndex);
    setEmptyCells(countEmptyCells(boardData));
    setIsSolved(false);
  }, [boardData]);

  // reset board saat ganti mode
  useEffect(() => {
    let row, col;

    row = difficultyData[difficulty].row;
    col = difficultyData[difficulty].col;

    const newBoard = new CreateBoard(row, col).board;

    setBoardData(newBoard);
  }, [mode]);

  // reset board saat selesai timer
  useEffect(() => {
    if (timerActive !== 0) return;
    setScore(0);
    let row, col;
    if (mode === 0) {
      row = difficultyData[difficulty].row;
      col = difficultyData[difficulty].col;
    } else {
      row = difficultyData[0].row;
      col = difficultyData[0].col;
    }

    const newBoard = new CreateBoard(row, col).board;

    setBoardData(newBoard);
  }, [timerActive]);

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
            timerActive={timerActive}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
