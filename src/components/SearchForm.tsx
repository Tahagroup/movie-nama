import React, { useRef } from "react";
import { useNavigate } from "react-router";
import "./SearchForm.css";
interface SearchFormPropsType {
  searchChangeHandler: (text: string, type: string, year: string) => void;
}
function SearchForm(props: SearchFormPropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  function searchHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    navigate("/");
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
      <form className="search-form" onSubmit={searchHandler}>
        <input
          className="form__input"
          type={"text"}
          ref={inputRef}
          defaultValue="batman"
          placeholder="Title"
        />
        {/* ////////////////////////////////////// */}
        <div className="type-container">
          <select className="type-selector" ref={typeRef}>
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
          className="form-year"
          type={"number"}
          ref={yearRef}
          min="1850"
          max="2030"
          defaultValue=""
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
