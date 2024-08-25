import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Game from "./pages/Game";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
