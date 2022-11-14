import React, { useState } from "react";
import "./App.css";
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

  function searchChangeHandler(text: string, type: string, year: string) {
    setSearchParams({ text, type, year });
  }
  return (
    <div className="App">
      <Header />
      <SearchForm searchChangeHandler={searchChangeHandler} />
      <Routes>
        <Route path="/" element={<Movies searchParams={searchParams} />} />
        <Route path=":imdbID" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
