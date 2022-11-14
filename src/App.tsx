import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Movies from "./components/Movies";
import SearchForm from "./components/SearchForm";
import Loading from "./components/utilities/Loading";
import useFetch from "./hooks/useFetch";
import MovieDetails from "./components/MovieDetails";
import Error from "./components/utilities/Error";

function App() {
  const [searchParams, setSearchParams] = useState<searchParameters>({
    text: "batman",
    type: "all",
    year: "",
  });

  let URL_TO_FETCH = `https://www.omdbapi.com/?s=${searchParams.text}&y=${searchParams.year}&apikey=62f005b3`;
  if (searchParams.type !== "all") {
    URL_TO_FETCH = `https://www.omdbapi.com/?s=${searchParams.text}&type=${searchParams.type}&y=${searchParams.year}&apikey=62f005b3`;
  }

  const [data, error, loading = true] = useFetch(URL_TO_FETCH) as [
    { Search: movieData[] } | undefined,
    Error,
    boolean
  ];
  // console.log(data, error, loading);

  const renderedComponent = loading ? (
    <Loading />
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <Movies fetchedMoviesData={data!.Search} searchParams={searchParams} />
  );

  function searchChangeHandler(text: string, type: string, year: string) {
    setSearchParams({ text, type, year });
  }
  return (
    <div className="App">
      <Header />
      <SearchForm searchChangeHandler={searchChangeHandler} />
      <Routes>
        <Route path="/" element={renderedComponent}></Route>
        <Route path=":imdbID" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
