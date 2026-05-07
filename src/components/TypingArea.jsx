import { useRef, useEffect, useState } from "react";

function TypingArea({
  typedText,
  setTypedText,
  isStarted,
  setIsStarted,
  compareResult,
  timeLeft,
}) {
  const textareaRef = useRef(null);
  const cursorRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);
  const cursorIndex = typedText.length;

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;

    const cursorTop = cursor.offsetTop;

    if (cursorTop > 180) {
      setTranslateY(-(cursorTop - 120));
    }
  }, [typedText]);

  return (
    <div
      className={isStarted ? "typing-area started" : "typing-area"}
      onClick={() => {
        setIsStarted(true);
        textareaRef.current.focus();
      }}
    >
      <div
        className="reference-wrapper"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        <p className={isStarted ? "reference-text" : "reference-text blurred"}>
          {compareResult.map((result, index) => {
            const isCursorHere = index === cursorIndex;

            return (
              <span key={result.index} className={result.match}>
                {isCursorHere && <span className="cursor" ref={cursorRef} />}
                {result.char1}
              </span>
            );
          })}

          {cursorIndex === compareResult.length && (
            <span className="cursor" ref={cursorRef} />
          )}
        </p>
      </div>

      <textarea
        ref={textareaRef}
        className="text-area"
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        disabled={!isStarted || timeLeft === 0}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}

export default TypingArea;
