import React, { useState } from "react";
import "./App.css";
import "./scss/styles.ts";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Movies from "./components/Movies";
import SearchForm from "./components/SearchForm";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [searchParams, setSearchParams] = useState<searchParameters>({
    text: "batman",
    type: "all",
    year: "",
  });
  const [pageNumber, setpageNumber] = useState(1);

  function pageChangeHandler(page: number) {
    setpageNumber(page);
  }
  function searchChangeHandler(text: string, type: string, year: string) {
    setSearchParams({ text, type, year });
    setpageNumber(1);
  }

  return (
    <div className="App">
      <Header />
      <SearchForm searchChangeHandler={searchChangeHandler} />
      <Routes>
        <Route
          path="/"
          element={
            <Movies
              searchParams={searchParams}
              pageNumber={pageNumber}
              pageChangeHandler={pageChangeHandler}
            />
          }
        />
        <Route path=":imdbID" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
