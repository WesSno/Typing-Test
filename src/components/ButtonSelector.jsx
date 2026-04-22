function ButtonSelector({ options, selected, setSelected, className }) {
  return (
    <div className="button-selector">
      {options.map((option) => {
        return (
          <button
            key={option}
            name={option}
            className={selected === option ? "active" : ""}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonSelector;
