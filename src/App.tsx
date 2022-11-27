import React, { useState } from "react";
import "./App.css";
import "./scss/styles.ts";

import { Route, Routes, useNavigate } from "react-router-dom";

import Movies from "./components/Movies";
import SearchForm from "./components/SearchForm";
import MovieDetails from "./components/MovieDetails";
import LandingPage from "./components/LandingPage";
import Page404 from "./components/utilities/Page404";

function App() {
  const [searchParams, setSearchParams] = useState<searchParameters>({
    text: "batman",
    type: "all",
    year: "",
  });
  const navigate = useNavigate();

  function searchChangeHandler(text: string, type: string, year: string) {
    setSearchParams({ text, type, year });
    navigate(
      `/search${"?t=" + text}${"&type=" + type}${
        year && "&y=" + year
      }${"&page=1"}`
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LandingPage searchChangeHandler={searchChangeHandler} />}
        />
        <Route
          path="/search*"
          element={
            <>
              <SearchForm searchChangeHandler={searchChangeHandler} />
              <Movies searchParams={searchParams} />
            </>
          }
        />
        <Route path="/:imdbID" element={<MovieDetails />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/PageNotFound" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
