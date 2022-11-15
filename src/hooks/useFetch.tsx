import { useEffect, useState } from "react";

function useFetch(url: string) {
  const [data, setData] = useState<movieData[] | undefined>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setisLoading] = useState<boolean>(true);
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchMovies() {
      try {
        setisLoading(true);
        const response = await fetch(url);
        // problems with server/URL. bad HTTP response
        if (!response.ok) {
          throw new Error("Response was not OK!");
        }
        const movies = response.json();
        return movies;
      } catch (error) {
        setError(error as Error);
      }
    }
    fetchMovies()
      .then((response) => {
        setisLoading(false);

        if (response.Response === "False") {
          throw new Error(response.Error);
        }

        // console.log(response);

        setError(undefined);
        setData(response);
      })
      .catch((error) => {
        const errorMessage =
          error.message ===
          "Cannot read properties of undefined (reading 'Response')"
            ? new Error(
                "There was a problem, check your connection and try again."
              )
            : error;
        setError(errorMessage);
        console.log(error);
      });
  }, [url]);

  return [data, error, isLoading];
}

export default useFetch;
