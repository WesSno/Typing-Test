import { useState } from "react";

function DifficultySelector() {
  const difficultyModes = ["Easy", "Medium", "Hard"];

  const [difficulty, setDifficulty] = useState("Hard");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (mode) => {
    setDifficulty(mode);
    setIsOpen(false);
  };

  return (
    <div className="difficulty-selector">
      <button className="selector-btn" onClick={() => setIsOpen(!isOpen)}>
        {difficulty} <img src="/images/icon-down-arrow.svg" alt="arrow down" />
      </button>

      {isOpen && (
        <div className="dropdown">
          {difficultyModes.map((mode) => (
            <label key={mode} className="dropdown-item">
              <input
                type="radio"
                name="difficulty"
                value={mode}
                checked={difficulty === mode}
                onChange={() => handleSelect(mode)}
              />
              {mode}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DifficultySelector;
