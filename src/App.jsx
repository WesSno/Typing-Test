import { useState, useEffect, useRef } from "react";
import Heading from "./components/Header";
import Status from "./components/Status";
import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useState("Hard");
  const [timeMode, setTimeMode] = useState("Timed (60s)");
  const [typedText, setTypedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestWPM, setBestWPM] = useState(0);
  const [finalWPM, setFinalWPM] = useState(0);
  const [referenceText, setReferenceText] = useState("");
  const [data, setData] = useState(null);
  const [isFirstTest, setIsFirstTest] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const restartIcon = "/images/icon-restart-2.svg";
  const reference = referenceText;
  const hasFinishedRef = useRef(false);

  const handleTyping = (value) => {
    if (value.length > reference.length) return;

    if (!isRunning && value.length > 0) {
      setIsRunning(true);

      if (timeMode === "Passage") {
        setStartTime(Date.now());
      }
    }

    setTypedText(value);
  };

  const finishTest = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const currentTimeLeft = timeLeft;
    const currentTypedText = typedText;

    let timeSpent;

    if (timeMode === "Passage" && !startTime) return;

    if (timeMode === "Passage") {
      timeSpent = (Date.now() - startTime) / 1000;
    } else {
      timeSpent = 60 - currentTimeLeft;
    }

    if (timeSpent < 1) timeSpent = 1;

    const words = currentTypedText.length / 5;
    const minutes = timeSpent / 60;

    const final = Math.round(words / minutes);

    const accuracy = calculateAccuracy(currentTypedText);
    const MIN_ACCURACY = 90;

    const first = bestWPM === 0;
    const newBest = !first && final > bestWPM && accuracy >= MIN_ACCURACY;

    setIsFirstTest(first);
    setIsNewBest(newBest);
    setFinalWPM(final);
    setIsRunning(false);
    setIsFinished(true);

    if (first) {
      setBestWPM(final);
    } else if (newBest) {
      setBestWPM(final);
    }
  };

  /** WORD PER MINUTE CALCULATION */
  const calculateWPM = () => {
    let timeSpent;

    if (timeMode === "Passage") {
      if (!startTime) return 0;
      timeSpent = (Date.now() - startTime) / 1000;
    } else {
      timeSpent = 60 - timeLeft;
    }

    if (timeSpent < 1) return 0;

    const words = typedText.length / 5;
    const minutes = timeSpent / 60;

    return Math.round(words / minutes);
  };

  /** ACCURACY CALCULATION */
  const calculateAccuracy = () => {
    const result = compare(typedText);

    const typedCount = typedText.length;
    if (typedCount === 0) return 0;

    const correctCount = result.filter((item) => item.match === "correct");

    return Math.round((correctCount.length / typedCount) * 100);
  };

  /****** RESET FUNCTION ******/
  const resetTest = () => {
    setTypedText("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);

    hasFinishedRef.current = false;
  };

  /** TIME LOGIC */
  // const currentWPM = calculateWPM();

  useEffect(() => {
    if (!isRunning) return;

    if (hasFinishedRef.current) return;

    if (timeMode === "Passage") return;

    if (timeLeft === 0 || typedText.length >= reference.length) {
      finishTest();

      // if (adjustedWPM > bestWPM) {
      //   setBestWPM(adjustedWPM);
      // }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, timeMode]);

  /***** PASSAGE MODE USEFFECT */
  useEffect(() => {
    if (!isRunning) return;
    if (timeMode !== "Passage") return;

    if (typedText.length >= reference.length) {
      finishTest();
    }
  }, [typedText, isRunning, timeMode]);

  /***RESET ON MODE/DIFFICULTY CHANGE */
  useEffect(() => {
    resetTest();
  }, [difficulty, timeMode]);

  /*************** FETCHING DATA ******************/
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  /** UPDATING REFERENCE TEXT BASED ON DIFFICULTY */
  useEffect(() => {
    if (!data) return;

    const passages = data[difficulty.toLowerCase()];

    if (!passages || passages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * passages.length);

    setReferenceText(passages[randomIndex].text);
  }, [difficulty, data]);

  const compare = (typedText) => {
    const typed = typedText;
    const refList = reference.split("");
    const typedList = typed.split("");

    return refList.map((char, index) => {
      if (typedList[index] === undefined) {
        return {
          index,
          char1: char,
          char2: typedList[index],
          match: "pending",
        };
      } else if (char === typedList[index]) {
        return {
          index,
          char1: char,
          char2: typedList[index],
          match: "correct",
        };
      } else {
        return {
          index,
          char1: char,
          char2: typedList[index],
          match: "incorrect",
        };
      }
    });
  };

  const compareResult = compare(typedText);

  const getCharacters = () => {
    const result = compare(typedText);

    const correct = result.filter((text) => text.match === "correct").length;
    const incorrect = result.filter(
      (text) => text.match === "incorrect",
    ).length;

    return {
      correct,
      incorrect,
      total: typedText.length,
    };
  };

  return (
    <div className="App">
      <Heading bestWPM={bestWPM} />

      {!isStarted && (
        <div className="initiate-test">
          <button onClick={() => setIsStarted(true)}>Start Typing Text</button>
          <p>Or click the text and start typing</p>
        </div>
      )}

      {!isFinished ? (
        <>
          <Status
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            timeMode={timeMode}
            setTimeMode={setTimeMode}
            timeLeft={timeLeft}
            calculateWPM={calculateWPM}
            calculateAccuracy={calculateAccuracy}
            isStarted={isStarted}
          />

          <TypingArea
            typedText={typedText}
            setTypedText={handleTyping}
            isStarted={isStarted}
            setIsStarted={setIsStarted}
            compareResult={compareResult}
            timeLeft={timeLeft}
          />
        </>
      ) : (
        <Results
          wpm={finalWPM}
          accuracy={calculateAccuracy()}
          typedText={typedText}
          isFirstTest={isFirstTest}
          isNewBest={isNewBest}
          resetTest={resetTest}
          restartIcon={restartIcon}
          charNum={getCharacters()}
        />
      )}

      {!isFinished && isStarted && (
        <div className="restart-btn">
          <button onClick={() => resetTest()}>
            Restart Test
            <img src="/images/icon-restart.svg" alt="restart icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
