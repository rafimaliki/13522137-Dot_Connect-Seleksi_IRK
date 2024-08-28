import React, { useMemo } from "react";
import { isEqual } from "lodash";

const LeaderBoard = ({
  player,
  playerList,
  score,
  setScore,
  difficulty,
  mode,
}) => {
  const indexToCompare = useMemo(() => {
    let index = 0;
    if (difficulty === 0) index = 0;
    else if (difficulty === 1) index = 1;
    else if (difficulty === 2) index = 2;
    else if (difficulty === 3) index = 3;

    if (mode === 1) index += 4;

    return index;
  }, [difficulty, mode]);

  // console.log("Index to compare:", indexToCompare);

  const topPlayers = useMemo(
    () => playerList?.getTopPlayers(indexToCompare),
    [playerList, indexToCompare]
  );

  // console.log("highscores:", player?.highscores[indexToCompare]);
  // console.log(player);

  return (
    <div className="py-4 w-36 h-[24rem] bg-white box-shadow-lg rounded-lg flex flex-col items-center">
      <p className="font-extrabold text-xl bg-gray-200 w-full text-center text-green-800 mb-2">
        Dot Connect
      </p>
      <p className="font-extralight text-sm">Username:</p>
      <p className="font-semibold">{player?.username}</p>
      <p className="font-extralight text-sm mt-1">Highscore:</p>
      <p className="font-semibold">{player?.highscores[indexToCompare] || 0}</p>
      <p className="font-extralight text-sm mt-1">Score:</p>
      <p className="font-semibold">{score}</p>
      <p className="font-bold text-lg w-full text-center bg-gray-200 mb-2 text-green-800 mt-3">
        Top Score 🏆
      </p>
      {topPlayers?.map((topPlayer, index) => (
        <div key={index} className="flex justify-between w-full px-2">
          <p className="font-light">{topPlayer.username}</p>
          <p className="font-semibold">
            {topPlayer.highscores[indexToCompare] || 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;
