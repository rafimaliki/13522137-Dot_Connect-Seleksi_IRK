const countScore = (difficulty, mode, time) => {
  let score = 0;
  if (difficulty === 0) score = 100;
  else if (difficulty === 1) score = 200;
  else if (difficulty === 2) score = 300;
  else if (difficulty === 3) score = 400;

  if (mode === 1) score /= 2;

  score -= time;
  if (score < 0) score = 0;

  return score;
};

export default countScore;
