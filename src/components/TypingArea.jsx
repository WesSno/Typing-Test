function TypingArea({
  typedText,
  setTypedText,
  isStarted,
  setIsStarted,
  compareResult,
  timeLeft,
}) {
  return (
    <div className={isStarted ? "typing-area started" : "typing-area"}>
      <p className={isStarted ? "reference-text" : "reference-text blurred"}>
        {compareResult.map((result) => (
          <span key={result.index} className={result.match}>
            {result.char1}
          </span>
        ))}
      </p>
      <textarea
        className="text-area"
        name=""
        id=""
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        onClick={() => setIsStarted(true)}
        disabled={!isStarted || timeLeft === 0}
        spellCheck={false}
        autoComplete="new-password"
        autoCorrect="off"
        autoCapitalize="off"
      ></textarea>
    </div>
  );
}

export default TypingArea;
