import React from "react";
import { Link } from "react-router-dom";

interface MovieCardTypes {
  movieData: movieData | undefined;
}
function MovieCard(props: MovieCardTypes) {
  const previewImage =
    props.movieData!.Poster === "N/A"
      ? "./no-image.jpg"
      : props.movieData!.Poster;
  // there is a – at end of some series:
  const year =
    props.movieData!.Year.slice(-1) === "–"
      ? props.movieData!.Year.slice(0, -1)
      : props.movieData!.Year;

  return (
    <Link to={`/${props.movieData!.imdbID}`}>
      <div className="card">
        <img className="image" src={previewImage} alt="No Preview Available" />
        <div className="flex-wrapper">
          <div className="title">{props.movieData!.Title}</div>
          <div className="year">({year})</div>
        </div>
        <div className="type">{props.movieData!.Type}</div>
      </div>
    </Link>
  );
}

export default MovieCard;
