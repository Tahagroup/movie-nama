import React from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import "./Movies.css";
import Loading from "./utilities/Loading";
interface MoviespropTypes {
  searchParams: searchParameters;
  pageChangeHandler: (page: number) => void;
  pageNumber: number;
}
function Movies(props: MoviespropTypes) {
  // const [pageNumber, setPageNumber] = useState(1);

  let URL_TO_FETCH = `https://www.omdbapi.com/?s=${props.searchParams.text}&y=${props.searchParams.year}&page=${props.pageNumber}&apikey=62f005b3`;
  if (props.searchParams.type !== "all") {
    URL_TO_FETCH = `https://www.omdbapi.com/?s=${props.searchParams.text}&type=${props.searchParams.type}&y=${props.searchParams.year}&page=${props.pageNumber}&apikey=62f005b3`;
  }

  const [data, error, isloading] = useFetch(URL_TO_FETCH) as [
    { Search: movieData[]; totalResults: string } | undefined,
    Error,
    boolean
  ];

  const numberOfPages = data ? Math.ceil(+data!.totalResults / 10) : null;

  // console.log(data, error, isloading);
  function prevClickHandler() {
    if (props.pageNumber !== 1) {
      props.pageChangeHandler(props.pageNumber - 1);
    }
  }
  function nextClickHandler() {
    if (props.pageNumber !== numberOfPages) {
      props.pageChangeHandler(props.pageNumber + 1);
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
            disabled={props.pageNumber === 1}
          >
            Previous Page
          </button>
          <div className="pages">
            ({props.pageNumber}/{numberOfPages})
          </div>
          <button
            className="next-btn"
            onClick={nextClickHandler}
            disabled={props.pageNumber === numberOfPages}
          >
            Next Page
          </button>
        </div>
      )}
    </>
  );
}

export default Movies;
