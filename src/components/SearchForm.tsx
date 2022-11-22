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
      <header className="header">Movie Nama</header>
      <form className="search-form" onSubmit={searchHandler}>
        <input
          className="form__title"
          type={"text"}
          ref={inputRef}
          defaultValue={searchParams.get("t")?.toString() ?? "batman"}
          placeholder="Title"
        />
        {/* ////////////////////////////////////// */}
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
        {/* ////////////////////////////////////// */}
        <input
          className="form__year "
          type={"number"}
          ref={yearRef}
          min="1850"
          max="2030"
          defaultValue={searchParams.get("y")?.toString()}
          placeholder="Year"
        />
        {/* ////////////////////////////////////// */}
        <button type="submit" className="form__searchbtn">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
