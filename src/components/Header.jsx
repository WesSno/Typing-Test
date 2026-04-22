function Heading({ bestWPM }) {
  return (
    <header>
      <div className="logo">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/logo-large.svg" />
          <img src="/images/logo-small.svg" alt="logo" />
        </picture>
      </div>

      <div className="best">
        <div className="img">
          <img src="/images/icon-personal-best.svg" alt="trophy icon" />
        </div>
        <p>
          <span>Personal</span> Best: {bestWPM} WPM
        </p>
      </div>
    </header>
  );
}

export default Heading;
