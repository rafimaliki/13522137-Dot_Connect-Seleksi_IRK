import Button from "../Button";

const StartTime = ({ timerActive, setTimerActive }) => {
  const func = () => {
    // console.log("Start/Stop Timer");
    setTimerActive((prev) => {
      if (prev === 0) return 1;
      if (prev === 1) return 2;
      if (prev === 2) return 0;
    });
  };

  var color;
  if (timerActive === 0) color = "green";
  if (timerActive === 1) color = "red";
  if (timerActive === 2) color = "blue";

  var title;
  if (timerActive === 0) title = "Start";
  if (timerActive === 1) title = "Stop";
  if (timerActive === 2) title = "Reset";

  return <Button color={color} onclick={func} title={title} />;
};

export default StartTime;
