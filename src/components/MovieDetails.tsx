import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Error from "./utilities/Error";
import Loading from "./utilities/Loading";

function NA_Handler(data: string, fallback: string) {
  return data === "N/A" ? fallback : data;
}

function MovieDetails() {
  const { imdbID } = useParams();

  const navigate = useNavigate();
  if (!imdbID?.startsWith("tt")) {
    navigate("/PageNotFound");
  }

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
        <>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br />
          <Error error={error} />
        </>
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
                    Director: {NA_Handler(detailsData.Director, "-")}
                  </div>
                  <div className="genre">
                    Genre: {NA_Handler(detailsData.Genre, "-")}
                  </div>
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
                          <td>{NA_Handler(detailsData.Country, "-")}</td>
                          <td>{NA_Handler(detailsData.Language, "-")}</td>
                          <td>{NA_Handler(detailsData.Rated, "-")}</td>
                          <td>{NA_Handler(detailsData.Runtime, "-")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="ratings">{rating}</div>
                </div>
              </div>
              <div className="details-plot">
                <div className="details-plot__title">Plot</div>
                <div className="details-plot__plot">
                  {NA_Handler(detailsData.Plot, "No plot provided")}
                </div>
              </div>
              <div className="details-castAndcrew">
                <div className="castAndcrew-item">
                  <div className="castAndcrew-item__title">
                    Actors:&nbsp;&nbsp; &nbsp;
                  </div>
                  <div className="castAndcrew-item__team">
                    {NA_Handler(detailsData.Actors, "No actors provided")}
                  </div>
                </div>
                <div className="castAndcrew-item">
                  <div className="castAndcrew-item__title">
                    Writers: &nbsp;&nbsp;
                  </div>
                  <div className="castAndcrew-item__team">
                    {NA_Handler(detailsData.Writer, "No writers provided")}
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
