// import { useEffect, useState } from "react";
// import { concatMap, tap } from "rxjs";
// import { fromFetch } from "rxjs/fetch";
import { useQuery } from "@tanstack/react-query";
function useFetch(url: string) {
  // const [data, setData] = useState<movieData[] | undefined>();
  // const [error, setError] = useState<Error | undefined>(undefined);
  // const [isLoading, setisLoading] = useState<boolean>(true);
  // Using useQuery
  async function fetchData() {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const movies = await response.json();
    if (movies.Response === "False") {
      throw new Error(movies.Error);
    }
    return movies;
  }
  const { data, status, error } = useQuery({
    queryKey: [url],
    queryFn: fetchData,
    retry: false,
  });
  return [data, error, status === "loading" ? true : false];

  // with RxJS:
  // useEffect(() => {
  //   setisLoading(true);
  //   const subscription = fromFetch(url)
  //     .pipe(
  //       tap((response) => {
  //         if (!response.ok) {
  //           console.log(response);
  //           throw new Error("Response was not OK!");
  //         }
  //       }),
  //       // merge the next notification that is emitted from the Observable created internally from the Promise returned from the .json() method:
  //       concatMap((response) => response.json()),
  //       tap((movies) => {
  //         setisLoading(false);
  //         if (movies.Response === "False") {
  //           throw new Error(movies.Error);
  //         }
  //         setError(undefined);
  //         // setData(movies);
  //       })
  //     )
  //     .subscribe({
  //       next: (data) => setData(data),
  //       error: (error) => {
  //         setError(error);
  //         setisLoading(false);
  //       },
  //       complete: () => setisLoading(false),
  //     });
  //   // this function will be called on component unmount
  //   // it will terminate the fetching
  //   return () => subscription.unsubscribe();
  // }, [url]);
  // return [data, error, isLoading];
}

export default useFetch;
