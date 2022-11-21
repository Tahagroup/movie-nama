import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Error from "./utilities/Error";
import Loading from "./utilities/Loading";
function MovieDetails() {
  const { imdbID } = useParams();
  const [detailsData, error, loading] = useFetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=62f005b3`
  ) as [any, Error, boolean];
  const previewImage =
    !detailsData || detailsData.Poster === "N/A"
      ? "./no-image.jpg"
      : detailsData.Poster;

  const rating =
    detailsData === undefined || detailsData.Ratings.length === 0
      ? ""
      : detailsData.Ratings.map((rating: rate) => (
          <div className="rate-item-wrapper" key={Math.random()}>
            <span className="rate-source">{rating.Source}:</span>
            <span className="rate-value">{rating.Value}</span>
          </div>
        ));
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="details-page">
          <img className="details-bg" src={detailsData.Poster} alt=""></img>
          <div className="details-container">
            <div className="details-wrapper">
              <div className="details-summary">
                <img className="movie-pic" src={previewImage} alt="" />
                <div className="movie-info">
                  <div className="movie-title">{detailsData.Title}</div>
                  <div className="director">
                    Director:{" "}
                    {detailsData.Director === "N/A"
                      ? "-"
                      : detailsData.Director}
                  </div>
                  <div className="genre">Genre: {detailsData.Genre}</div>
                  <div className="summary">
                    <table>
                      <thead>
                        <tr>
                          <th>Country</th>
                          <th>Language</th>
                          <th>PG</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{detailsData.Country}</td>
                          <td>{detailsData.Language}</td>
                          <td>{detailsData.Rated}</td>
                          <td>{detailsData.Runtime}</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* {detailsData.Country} | {detailsData.Language} |{" "}
                  {detailsData.Rated} | {detailsData.Runtime} */}
                  </div>
                  <div className="ratings">{rating}</div>
                </div>
              </div>
              <div className="details-plot">
                <div className="details-plot__title">Plot</div>
                <div className="details-plot__plot">{detailsData.Plot}</div>
              </div>
              <div className="details-castAndcrew">
                <div className="castAndcrew-item">
                  <div className="castAndcrew-item__title">
                    Actors:&nbsp;&nbsp; &nbsp;
                  </div>
                  <div className="castAndcrew-item__team">
                    {detailsData.Actors}
                  </div>
                </div>
                <div className="castAndcrew-item">
                  <div className="castAndcrew-item__title">
                    Writers: &nbsp;&nbsp;
                  </div>
                  <div className="castAndcrew-item__team">
                    {detailsData.Writer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;

// const data = {
///   Title: "Guardians of the Galaxy Vol. 2",
///   Year: "2017",
///   Rated: "PG-13",
///   Released: "05 May 2017",
///   Runtime: "136 min",
///   Genre: "Action, Adventure, Comedy",
///   Director: "James Gunn",
///   Writer: "James Gunn, Dan Abnett, Andy Lanning",
///   Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
///   Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
///   Language: "English",
///   Country: "United States",
//   Awards: "Nominated for 1 Oscar. 15 wins & 59 nominations total",
///   Poster:
///     "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
///   Ratings: [
///     { Source: "Internet Movie Database", Value: "7.6/10" },
///     { Source: "Rotten Tomatoes", Value: "85%" },
///     { Source: "Metacritic", Value: "67/100" },
///   ],
///   Metascore: "67",
///   imdbRating: "7.6",
//   imdbVotes: "674,085",
//   imdbID: "tt3896198",
//   Type: "movie",
//   DVD: "22 Aug 2017",
//   BoxOffice: "$389,813,101",
//   Production: "N/A",
//   Website: "N/A",
///   Response: "True",
// };
