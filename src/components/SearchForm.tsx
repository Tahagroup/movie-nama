import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
interface SearchFormPropsType {
  searchChangeHandler: (text: string, type: string, year: string) => void;
}
function SearchForm(props: SearchFormPropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  let [searchParams] = useSearchParams();
  // setting default value based on URL
  if (inputRef.current && inputRef.current) {
    inputRef.current!.value =
      searchParams.get("t") === undefined
        ? "Batman"
        : searchParams.get("t")!.toString();
  }
  if (typeRef.current && typeRef.current) {
    typeRef.current!.value =
      searchParams.get("type") === undefined
        ? "all"
        : searchParams.get("type")!.toString();
  }
  if (yearRef.current && yearRef.current.value) {
    yearRef.current!.value =
      searchParams.get("y") === undefined
        ? ""
        : searchParams.get("y")!.toString();
  }
  
  function searchHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    const value = inputRef.current!.value.trim();
    const type = typeRef.current!.value.trim();
    const year = yearRef.current!.value.trim();
    if (!value) {
      return;
    }

    props.searchChangeHandler(value, type, year);
  }

  return (
    <section className="form-wrapper">
      <img className="logo" src="./logo.png" alt="logo" />
      <form className="search-form" onSubmit={searchHandler}>
        <input
          className="form__title"
          type={"text"}
          ref={inputRef}
          defaultValue={searchParams.get("t")?.toString() ?? "batman"}
          placeholder="Title"
        />
        <div className="type-year-wrapper">
          <div className="form__type">
            <select
              className="type-selector"
              ref={typeRef}
              defaultValue={searchParams.get("type")?.toString()}
            >
              <option className="type-option" value="all">
                All
              </option>
              <option className="type-option" value="movie">
                Movies
              </option>
              <option className="type-option" value="series">
                Series
              </option>
            </select>
          </div>
          <input
            className="form__year "
            type={"number"}
            ref={yearRef}
            min="1850"
            max="2030"
            defaultValue={searchParams.get("y")?.toString()}
            placeholder="Year"
          />
        </div>
        <button type="submit" className="form__searchbtn">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
