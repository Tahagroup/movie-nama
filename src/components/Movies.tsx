import React from "react";
import MovieCard from "./MovieCard";
import "./Movies.css";
interface MoviespropTypes {
  fetchedMoviesData: movieData[] | undefined;
}
function Movies(props: MoviespropTypes) {
  const movies = props.fetchedMoviesData ?? ["loading"];

  return (
    <section className="cards-wrapper">
      {movies.map((movie, index) => (
        <MovieCard movieData={movie as movieData | undefined} key={index} />
      ))}
    </section>
  );
}

export default Movies;
