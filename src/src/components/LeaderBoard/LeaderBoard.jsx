import React, { useMemo } from "react";
import { isEqual } from "lodash";

const LeaderBoard = React.memo(
  ({ player, playerList }) => {
    const topPlayers = useMemo(() => playerList?.getTopPlayers(), [playerList]);

    // console.log("top", topPlayers);

    return (
      <div className="py-4 w-36 h-[24rem] bg-white box-shadow-lg rounded-lg flex flex-col items-center">
        <p className="font-extrabold text-xl bg-gray-200 w-full text-center text-green-800 mb-2">
          Dot Connect
        </p>
        <p className="font-extralight text-sm">Username:</p>
        <p className="font-semibold">{player?.username}</p>
        <p className="font-extralight text-sm mt-2">Highscore:</p>
        <p className="font-semibold">{player?.highscore}</p>
        <p className="font-bold text-lg w-full text-center bg-gray-200 mb-2 text-green-800 mt-5">
          Top Score 🏆
        </p>
        {topPlayers?.map((topPlayer, index) => (
          <div key={index} className="flex justify-between w-full px-2">
            <p className="font-light">{topPlayer.username}</p>
            <p className="font-semibold">{topPlayer.highscore}</p>
          </div>
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.player?.username === nextProps.player?.username &&
      prevProps.player?.highscore === nextProps.player?.highscore &&
      isEqual(
        prevProps.playerList?.getTopPlayers(),
        nextProps.playerList?.getTopPlayers()
      )
    );
  }
);

export default LeaderBoard;
