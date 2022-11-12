import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import SearchForm from "./components/SearchForm";
import useFetch from "./hooks/useFetch";

function App() {
  const [searchText, setSearchText] = useState<string>("batman");

  const URL_TO_FETCH = `http://www.omdbapi.com/?s=${searchText}&apikey=62f005b3`;
  const [data, error, loading] = useFetch(
    // "http://www.omdbapi.com/?i=tt3896198&apikey=wrong" // a single movie
    URL_TO_FETCH
  ) as [movieData[] | undefined, string | undefined, boolean];

  function searchChangeHandler(text: string) {
    setSearchText(text);
  }
  // console.log(data, error, loading);
  return (
    <div className="App">
      <Header />
      <SearchForm searchChangeHandler={searchChangeHandler} />
      {loading ? (
        <div style={{ fontSize: "20px" }}>loading</div>
      ) : (
        <Movies fetchedMoviesData={data} />
      )}
    </div>
  );
}

export default App;
