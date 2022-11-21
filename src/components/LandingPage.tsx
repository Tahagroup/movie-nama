import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
interface LandingPagePropTypes {
  searchChangeHandler: (text: string, type: string, year: string) => void;
}
function LandingPage(props: LandingPagePropTypes) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  function searchClickHandler(e: React.SyntheticEvent) {
    const value = inputRef.current!.value.trim();
    if (!value) {
      setHasError(true);
      return;
    }
    navigate("/search");
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
          <div className="slogan__main">Search for movies and series,</div>
          <div className="slogan__main">Fast and Easy.</div>
          <div className="slogan__sub">
            Search Details To Find Your Favorites 😍
          </div>
        </div>
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            placeholder={hasError ? "Type Something." : "Enter Title"}
          />
          <button onClick={searchClickHandler}>Start Browsing &rsaquo;</button>
        </div>
        {/* {hasError && <span className="error">Type something!</span>} */}
      </div>
    </div>
  );
}

export default LandingPage;
