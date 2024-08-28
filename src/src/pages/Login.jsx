import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/API";
import { LocalStorageGet, LocalStorageSet } from "../api/LocalStorage";
import Player from "../class/Player";
import Alert from "../components/Alert";

const LoginPage = ({
  apiInstance,
  setApiInstance,
  playerList,
  setPlayerList,
  player,
  setPlayer,
}) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const showAlert = (message, type = "info") => {
    setAlert({ message, type, visible: true });
  };

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      showAlert("Username and password cannot be empty", "error");
      return;
    }

    // mode newGame
    if (mode === 0) {
      const newPlayer = new Player({
        username: username,
        password: password,
        highscore: Array(8).fill(0),
      });
      const success = playerList.addPlayer(newPlayer);

      if (!success) {
        showAlert("Username already exists", "error");
        return;
      }

      setPlayer(playerList.getPlayer(username));
      apiInstance.post(playerList.players);

      LocalStorageSet("player", newPlayer);
      LocalStorageSet("playerList", playerList.players);
      navigate("/game");
    }
    // mode loadGame
    else {
      const playerData = playerList.getPlayer(username);

      if (!playerData) {
        showAlert("Player does not exist", "error");
        return;
      } else if (playerData.password !== password) {
        showAlert("Invalid password", "error");
        return;
      }

      setPlayer(playerData);

      LocalStorageSet("player", playerData);
      LocalStorageSet("playerList", playerList.players);
      navigate("/game");
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-yellow-200 to-green-200 font-mono">
      <div className="w-80 p-6 border border-gray-300 bg-white rounded-lg box-shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-green-700 mb-2">
            Dot Connect Game
          </h1>
        </div>

        <div className="flex justify-between mb-3">
          <button
            onClick={() => handleModeChange(0)}
            className={`w-32 h-10 px-4 py-2 rounded ease-in-out duration-150 ${
              mode === 0
                ? "bg-green-200 text-green-800"
                : "bg-green-800 text-white hover:bg-green-200 hover:text-green-800"
            }`}
          >
            New Game
          </button>
          <button
            onClick={() => handleModeChange(1)}
            className={`w-32 h-10 px-4 py-2 rounded ease-in-out duration-150 ${
              mode === 1
                ? "bg-green-200 text-green-800"
                : "bg-green-800 text-white hover:bg-green-200 hover:text-green-800"
            }`}
          >
            Load Game
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            ref={usernameRef}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            ref={passwordRef}
          />
        </div>
        {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-green-800 text-white px-4 py-2 rounded hover:bg-green-200 hover:text-green-800 ease-in-out duration-150"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
