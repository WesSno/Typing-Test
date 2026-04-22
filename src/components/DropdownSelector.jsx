import { useState } from "react";

function DropdownSelector({ options, selected, setSelected, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-selector ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="selector-btn">
        {selected} <img src="/images/icon-down-arrow.svg" alt="down arrow" />
      </button>

      {isOpen && (
        <div className="dropdown">
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="radio"
                name={option}
                checked={selected === option}
                onChange={() => handleSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSelector;
