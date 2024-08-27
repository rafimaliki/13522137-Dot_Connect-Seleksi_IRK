import React, { useEffect, useState } from "react";

import Board from "../components/Board/Board";
import BoardData from "../class/BoardData";
import boards from "../data/boards";

import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import ControlPanel from "../components/ControlPanel/ControlPanel";

import Player from "../class/Player";
import PlayerList from "../class/PlayerList";
import { LocalStorageGet } from "../api/LocalStorage";

import { useNavigate } from "react-router-dom";
import { countEmptyCells } from "../logic/utils";

const GamePage = ({
  apiInstance,
  playerList,
  setPlayerList,
  player,
  setPlayer,
}) => {
  const initBoard = boards[0];
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
        <LeaderBoard player={player} playerList={playerList} />
        <Board props={props} />
        <ControlPanel props={props} />
      </div>
    </div>
  );
};

export default GamePage;
