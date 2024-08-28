import React, { useEffect } from "react";

const Time = ({ time, setTime, timerActive }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  useEffect(() => {
    let interval;

    if (timerActive === 1) {
      setTime(0);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timerActive === 0) {
      clearInterval(interval);
      //   setTime(0);
    } else if (timerActive === 2) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, setTime]);

  return (
    <div className="w-fit p-2 h-8 flex items-center justify-center bg-white rounded-lg box-shadow-lg">
      <p className="text-center text-lg">{formatTime(time)}</p>
    </div>
  );
};

export default Time;
