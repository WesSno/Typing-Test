function Results({
  wpm,
  accuracy,
  typedText,
  isFirstTest,
  isNewBest,
  resetTest,
  charNum,
}) {
  let title = "";
  let subtitle = "";
  let buttonText = "";
  let decorativeIcon = "";
  let bestDecorativeIcon = "";
  let decorativeIconTwo = "";
  let decorativeIconThree = "";
  let newBestDecorativeIconThree = "";

  if (isFirstTest) {
    title = "Baseline Established!";
    subtitle =
      "Yo've set the bar. Now the real challenge begins-time to beat it";
    buttonText = "Beat This Score";
    decorativeIcon = "/images/icon-completed.svg";
    decorativeIconTwo = "/images/pattern-star-2.svg";
    decorativeIconThree = "/images/pattern-star-1.svg";
  } else if (isNewBest) {
    title = "High Score Smashed!";
    subtitle = "You're getting faster. That was incredible typing.";
    buttonText = "Go Again";
    bestDecorativeIcon = "/images/icon-new-pb.svg";
    newBestDecorativeIconThree = "/images/pattern-confetti.svg";
  } else {
    title = "Test Complete!";
    subtitle = "Solid run. Keep pushing to beat your high score";
    buttonText = "Go Again";
    decorativeIcon = "/images/icon-completed.svg";
    decorativeIconTwo = "/images/pattern-star-2.svg";
    decorativeIconThree = "/images/pattern-star-1.svg";
  }

  return (
    <div className="results">
      {isNewBest ? (
        <div>
          <img src={bestDecorativeIcon} alt="top confetti icon" />
        </div>
      ) : (
        <div className="decorative-icon">
          <img src={decorativeIcon} alt="complete icon" />
        </div>
      )}

      {!isNewBest && (
        <div className="decorative-icon-two">
          <img src={decorativeIconTwo} alt="decorative-icon-two" />
        </div>
      )}
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="results-status">
        <div className="wpm-results">
          <p>WPM:</p> <h2>{wpm}</h2>
        </div>

        <div className="accuracy-results">
          <p>Accuracy:</p> <h2>{accuracy}%</h2>
        </div>

        <div className="characters-results">
          <p>Characters:</p>
          <h2>
            <span className="correct-num">{charNum.correct}</span>/
            <span className="incorrect-num">{charNum.incorrect}</span>
          </h2>
        </div>
      </div>

      <div className="reset-btn">
        <button onClick={resetTest}>
          {buttonText}
          <img src="/images/icon-restart-2.svg" alt="restart icon" />
        </button>
      </div>

      {isNewBest ? (
        <div className="new-best-decorative">
          <img src={newBestDecorativeIconThree} alt="confetti icon" />
        </div>
      ) : (
        <div className="decorative-icon-three">
          <img src={decorativeIconThree} alt="star icon" />
        </div>
      )}
    </div>
  );
}

export default Results;
