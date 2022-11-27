import React, { useRef, useState } from "react";
interface LandingPagePropTypes {
  searchChangeHandler: (text: string, type: string, year: string) => void;
}
function LandingPage(props: LandingPagePropTypes) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasError, setHasError] = useState(false);
  function searchClickHandler() {
    const value = inputRef.current!.value.trim();
    if (!value) {
      setHasError(true);
      return;
    }
    // navigate("/search");
    props.searchChangeHandler(value, "all", "");
  }
  return (
    <div className="landing-page">
      <div className="landing-wrapper">
        <div className="header">
          <img src="./logo.png" alt="logo" className="logo" />
          <a className="github" href="https://github.com/Tahagroup/movie-nama">
            <span>Github</span>
            <img src="../github-icon.svg" alt="github" />
          </a>
        </div>
        <div className="slogan">
          <span className="slogan__main">Search for movies and series,</span>
          <div className="slogan__main">Fast and Convenient.</div>
          <div className="slogan__sub">
            Search Details To Find Your Favorites 😍
          </div>
        </div>
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            placeholder={hasError ? "Type Something." : "Enter Title"}
            onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
              if (event.key === "Enter") {
                event.preventDefault();
                searchClickHandler();
              }
            }}
          />
          <button onClick={searchClickHandler}>Start Browsing &rsaquo;</button>
        </div>
        {/* {hasError && <span className="error">Type something!</span>} */}
      </div>
    </div>
  );
}

export default LandingPage;
