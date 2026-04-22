import React from "react";
import DropdownSelector from "./DropdownSelector";
import ButtonSelector from "./ButtonSelector";

function Status({
  difficulty,
  setDifficulty,
  timeMode,
  setTimeMode,
  timeLeft,
  calculateWPM,
  calculateAccuracy,
  isStarted,
}) {
  return (
    <div className="status">
      <div className="scores">
        <div className="word-per-minute">
          <h2>
            <span>WPM:</span> {calculateWPM()}
          </h2>
        </div>

        <div className="accuracy">
          <h2 className={isStarted ? "start" : ""}>
            <span>Accuracy: </span>
            {calculateAccuracy()}%
          </h2>
        </div>

        <div className="time">
          <h2 className={isStarted ? "time-started" : ""}>
            <span>Time:</span>
            {timeLeft}s
          </h2>
        </div>
      </div>

      <div className="difficulty-modes">
        <DropdownSelector
          options={["Easy", "Medium", "Hard"]}
          selected={difficulty}
          setSelected={setDifficulty}
          className="difficulty-mode"
        />

        <DropdownSelector
          options={["Timed (60s)", "Passage"]}
          selected={timeMode}
          setSelected={setTimeMode}
          className="time-mode"
        />

        <div className="desktop-diff-mode">
          <span className="diff-level-theme">Difficulty:</span>

          <ButtonSelector
            options={["Easy", "Medium", "Hard"]}
            selected={difficulty}
            setSelected={setDifficulty}
          />
        </div>

        <div className="desktop-time-mode">
          <span className="time-mode-theme">Mode:</span>

          <ButtonSelector
            options={["Timed (60s)", "Passage"]}
            selected={timeMode}
            setSelected={setTimeMode}
          />
        </div>
      </div>
    </div>
  );
}

export default Status;
