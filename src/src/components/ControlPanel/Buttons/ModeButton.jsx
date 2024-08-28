import React from "react";
import Button from "../../Button";

const ModeButton = ({
  mode,
  setMode,
  isSolving,
  setTimerActive,
  setScore,
  timerActive,
}) => {
  const modes = ["Manual", "Bot"];
  const changeMode = () => {
    if (isSolving || timerActive === 1) return;

    setMode((mode + 1) % 2);
    setTimerActive(0);
    setScore(0);
  };
  return <Button color="blue" onclick={changeMode} title={`${modes[mode]}`} />;
};

export default ModeButton;
