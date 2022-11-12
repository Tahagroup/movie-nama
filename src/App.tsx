import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import SearchForm from "./components/SearchForm";
import Loading from "./components/utilities/Loading";
import useFetch from "./hooks/useFetch";

function App() {
  const [searchText, setSearchText] = useState<string>("batman");

  const URL_TO_FETCH = `http://www.omdbapi.com/?s=${searchText}&apikey=62f005b3`;
  const [data, error, loading] = useFetch(
    // "http://www.omdbapi.com/?i=tt3896198&apikey=wrong" // a single movie
    URL_TO_FETCH
  ) as [movieData[] | undefined, string | undefined, boolean];
  const renderedComponent = loading ? (
    <Loading />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Movies fetchedMoviesData={data} />
  );

  function searchChangeHandler(text: string) {
    setSearchText(text);
  }
  return (
    <div className="App">
      <Header />
      <SearchForm searchChangeHandler={searchChangeHandler} />
      {renderedComponent}
    </div>
  );
}

export default App;
