import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./utilities/Loading";
function MovieDetails() {
  const { imdbID } = useParams();
  const [detailsData, error, loading] = useFetch(
    `http://www.omdbapi.com/?i=${imdbID}&apikey=62f005b3`
  ) as [any, Error, boolean];
  console.log(detailsData, error, loading);

  return (
    <div>
      {error ? "" : <div>{error}</div>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <img src={detailsData.Poster} alt="" className="movie-pic" />
          <div className="movie-desc">{detailsData.Title}</div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;

// const data = {
//   Title: "Guardians of the Galaxy Vol. 2",
//   Year: "2017",
//   Rated: "PG-13",
//   Released: "05 May 2017",
//   Runtime: "136 min",
//   Genre: "Action, Adventure, Comedy",
//   Director: "James Gunn",
//   Writer: "James Gunn, Dan Abnett, Andy Lanning",
//   Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
//   Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
//   Language: "English",
//   Country: "United States",
//   Awards: "Nominated for 1 Oscar. 15 wins & 59 nominations total",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
//   Ratings: [
//     { Source: "Internet Movie Database", Value: "7.6/10" },
//     { Source: "Rotten Tomatoes", Value: "85%" },
//     { Source: "Metacritic", Value: "67/100" },
//   ],
//   Metascore: "67",
//   imdbRating: "7.6",
//   imdbVotes: "674,085",
//   imdbID: "tt3896198",
//   Type: "movie",
//   DVD: "22 Aug 2017",
//   BoxOffice: "$389,813,101",
//   Production: "N/A",
//   Website: "N/A",
//   Response: "True",
// };
