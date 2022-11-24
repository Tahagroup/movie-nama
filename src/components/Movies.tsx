import React from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import Error from "./utilities/Error";
import Loading from "./utilities/Loading";
interface MoviespropTypes {
  searchParams: searchParameters;
  // pageChangeHandler: (page: number) => void;
  // pageNumber: number;
}
function Movies(props: MoviespropTypes) {
  let [searchParams, setSearchParams] = useSearchParams();

  const [title, type, year, page] = [
    searchParams.get("t") || "batman",
    searchParams.get("type") || "all",
    searchParams.get("y") || "",
    searchParams.get("page") || "1",
  ];

  let URL_TO_FETCH = `https://www.omdbapi.com/?s=${title}${
    type && type !== "all" ? `&type=${type}` : ""
  }&y=${year}&page=${page}&apikey=62f005b3`;
  // console.log(URL_TO_FETCH);

  const [data, error, isloading] = useFetch(URL_TO_FETCH) as [
    { Search: movieData[]; totalResults: string } | undefined,
    Error,
    boolean
  ];

  const numberOfPages = data ? Math.ceil(+data!.totalResults / 10) : null;

  function prevClickHandler() {
    if (+page! !== 1) {
      // update searchParams and re-render with new data
      searchParams.set("page", (+page! - 1).toString());
      setSearchParams(searchParams);
    }
  }
  function nextClickHandler() {
    if (+page !== numberOfPages) {
      searchParams.set("page", (+page! + 1).toString());
      setSearchParams(searchParams);
      // setpageNumber(pageNumber! + 1);
    }
  }
  return (
    <>
      <section className="cards-wrapper">
        {isloading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
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
            disabled={+page! === 1}
          >
            &lsaquo;
          </button>
          <div className="pages">
            ({+page!}/{numberOfPages})
          </div>
          <button
            className="next-btn"
            onClick={nextClickHandler}
            disabled={+page! === numberOfPages}
          >
            &rsaquo;
          </button>
        </div>
      )}
    </>
  );
}

export default Movies;
