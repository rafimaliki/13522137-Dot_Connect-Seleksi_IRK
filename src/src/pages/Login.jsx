import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUsername }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    setUsername(username);

    if (username && password) {
      console.log({ username: username, password: password });
      navigate("/game");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 font-mono">
      <div className="w-80 p-6 border border-gray-300 bg-white rounded-lg box-shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-blue-600 mb-2">
            Dot Connect Game
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            ref={passwordRef}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
