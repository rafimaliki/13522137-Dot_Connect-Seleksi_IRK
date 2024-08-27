import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Game from "./pages/Game";

import API from "./api/API";
import { LocalStorageSet } from "./api/LocalStorage";

function App() {
  const [apiInstance, setApiInstance] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setPlayer(null);
    setPlayerList(null);

    const newAPI = new API();
    setApiInstance(newAPI);

    newAPI
      .request()
      .then((data) => {
        setPlayerList(data);
        // console.log("Player List Data:", data.players);
      })
      .catch((error) => {
        console.error("Error fetching player data:", error);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                apiInstance={apiInstance}
                setApiInstance={setApiInstance}
                playerList={playerList}
                setPlayerList={setPlayerList}
                player={player}
                setPlayer={setPlayer}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                apiInstance={apiInstance}
                playerList={playerList}
                setPlayerList={setPlayerList}
                player={player}
                setPlayer={setPlayer}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
