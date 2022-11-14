import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import "./Movies.css";
import Loading from "./utilities/Loading";
interface MoviespropTypes {
  searchParams: searchParameters;
}
function Movies(props: MoviespropTypes) {
  const [pageNumber, setPageNumber] = useState(1);

  let URL_TO_FETCH = `https://www.omdbapi.com/?s=${props.searchParams.text}&y=${props.searchParams.year}&page=${pageNumber}&apikey=62f005b3`;
  if (props.searchParams.type !== "all") {
    URL_TO_FETCH = `https://www.omdbapi.com/?s=${props.searchParams.text}&type=${props.searchParams.type}&y=${props.searchParams.year}&page=${pageNumber}&apikey=62f005b3`;
  }

  const [data, error, isloading = true] = useFetch(URL_TO_FETCH) as [
    { Search: movieData[]; totalResults: string } | undefined,
    Error,
    boolean
  ];

  const numberOfPages = data ? Math.ceil(+data!.totalResults / 10) : null;
  console.log(numberOfPages);

  // console.log(data, error, isloading);
  function prevClickHandler() {
    if (pageNumber !== 1) {
      setPageNumber((prevPage) => --prevPage);
    }
  }
  function nextClickHandler() {
    if (pageNumber !== numberOfPages) {
      setPageNumber((prevPage) => ++prevPage);
    }
  }
  return (
    <>
      <section className="cards-wrapper">
        {isloading ? (
          <Loading />
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            {data!.Search.map((movie, index) => (
              <MovieCard
                movieData={movie as movieData | undefined}
                key={index}
              />
            ))}
          </>
        )}
      </section>
      {/* Pagination: */}
      {!isloading && !error && (
        <div className="pagination-wrapper">
          <button
            className="prev-btn"
            onClick={prevClickHandler}
            disabled={pageNumber === 1}
          >
            Previous Page
          </button>
          <div className="pages">
            ({pageNumber}/{numberOfPages})
          </div>
          <button
            className="next-btn"
            onClick={nextClickHandler}
            disabled={pageNumber === numberOfPages}
          >
            Next Page
          </button>
        </div>
      )}
    </>
  );
}

export default Movies;
