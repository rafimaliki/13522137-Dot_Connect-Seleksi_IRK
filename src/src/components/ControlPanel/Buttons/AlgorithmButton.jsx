import React from "react";
import Button from "../../Button";

const algorithms = ["Backtrack", "Bruteforce", "Greedy", "A*"];

const AlgorithmButton = ({ algorithm, setAlgorithm, isSolving }) => {
  const changeAlgorithm = () => {
    if (isSolving) return;
    setAlgorithm((algorithm + 1) % algorithms.length);
  };
  return (
    <Button
      color="blue"
      onclick={changeAlgorithm}
      title={`${algorithms[algorithm]}`}
    />
  );
};

export default AlgorithmButton;
