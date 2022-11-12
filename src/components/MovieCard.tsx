import React from "react";
import "./MovieCard.css";
interface MovieCardTypes {
  movieData: movieData | undefined;
}
function MovieCard(props: MovieCardTypes) {
  const previewImage =
    props.movieData!.Poster === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png"
      : props.movieData!.Poster;
  return (
    <div className="card">
      <img className="image" src={previewImage} alt="Preview Not Available" />
      <div className="flex-wrapper">
        <div className="title">{props.movieData!.Title}</div>
        <div className="year">({props.movieData!.Year})</div>
      </div>
    </div>
  );
}

export default MovieCard;
