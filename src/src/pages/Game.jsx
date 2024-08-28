import React, { useEffect, useState } from "react";

import Board from "../components/Board/Board";
import BoardData from "../class/BoardData";
import boards from "../data/boards";

import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import Time from "../components/Time/Time";

import Separator from "../components/Separator";

import Player from "../class/Player";
import PlayerList from "../class/PlayerList";
import { LocalStorageGet } from "../api/LocalStorage";

import { useNavigate } from "react-router-dom";
import { countEmptyCells } from "../logic/utils";
import StartTime from "../components/Time/StartTime";

const GamePage = ({
  apiInstance,
  playerList,
  setPlayerList,
  player,
  setPlayer,
}) => {
  const initBoard = boards[3];
  const [boardData, setBoardData] = useState(initBoard);
  const [board, setBoard] = useState(new BoardData(boardData));
  const [dragging, setDragging] = useState(false);
  const [prevIndex, setPrevIndex] = useState(board.startIndex);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [emptyCells, setEmptyCells] = useState(countEmptyCells(initBoard));
  const [mode, setMode] = useState(0);
  const [algorithm, setAlgorithm] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(0);

  const navigate = useNavigate();

  const props = {
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
    time,
    setTime,
    timerActive,
    setTimerActive,
    apiInstance,
    player,
    setPlayer,
    playerList,
    setPlayerList,
    score,
    setScore,
  };

  useEffect(() => {
    let playerLoaded = false;
    let playerListLoaded = false;

    if (!player) {
      const storedPlayer = LocalStorageGet("player");
      if (storedPlayer) {
        const playerData = new Player(storedPlayer);
        setPlayer(playerData);
        playerLoaded = true;
      }
    } else {
      playerLoaded = true;
    }

    if (!playerList) {
      const storedPlayerList = LocalStorageGet("playerList");
      if (storedPlayerList) {
        const playerListData = new PlayerList(storedPlayerList);
        setPlayerList(playerListData);
        playerListLoaded = true;
      }
    } else {
      playerListLoaded = true;
    }

    if (!playerLoaded && !playerListLoaded) {
      navigate("/");
    }
  }, [player, playerList, setPlayer, setPlayerList, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-yellow-200 to-green-200 font-mono">
      <div className="flex items-center justify-center h-fit">
        <LeaderBoard
          player={player}
          playerList={playerList}
          score={score}
          setScore={setScore}
          difficulty={difficulty}
          mode={mode}
        />
        <div className="flex flex-col items-center">
          {timerActive ? (
            <Time time={time} setTime={setTime} timerActive={timerActive} />
          ) : (
            <Separator height="8" width="3" />
          )}
          <Board props={props} />
          {mode === 0 && timerActive !== 1 ? (
            <StartTime
              timerActive={timerActive}
              setTimerActive={setTimerActive}
            />
          ) : (
            <Separator height="10" width="3" />
          )}
        </div>
        <ControlPanel props={props} />
      </div>
    </div>
  );
};

export default GamePage;
