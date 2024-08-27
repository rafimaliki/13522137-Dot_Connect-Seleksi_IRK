import React from "react";
import Button from "../../Button";

const ModeButton = ({ mode, setMode, isSolving }) => {
  const modes = ["Manual", "Bot"];
  const changeMode = () => {
    if (isSolving) return;
    setMode((mode + 1) % 2);
  };
  return <Button color="blue" onclick={changeMode} title={`${modes[mode]}`} />;
};

export default ModeButton;
