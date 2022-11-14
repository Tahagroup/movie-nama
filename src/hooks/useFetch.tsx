import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState<movieData[] | undefined>([
    {
      Poster: "N/A",
      Title: "Loading",
      Type: "string",
      Year: "Loading",
      imdbID: "Loading",
    },
  ]);
  // const [data, setData] = useState<movieData[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch(url);
        // problems with server/URL. bad HTTP response
        if (!response.ok) {
          throw new Error("Response was not OK!");
        }
        const movies = response.json();

        return movies;
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies()
      .then((response) => {
        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        console.log(response);

        setData(response);
        // fetchImages(response.Search);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [url]);

  return [data, error, loading];
}

export default useFetch;

// const returned = {
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
