import React, { useRef } from "react";
import "./SearchForm.css";
interface SearchFormPropsType {
  searchChangeHandler: (text: string) => void;
}
function SearchForm(props: SearchFormPropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  function searchHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    const value = inputRef.current!.value;
    props.searchChangeHandler(value);
  }

  return (
    <section className="form-wrapper">
      <form className="search-form" onSubmit={searchHandler}>
        <input
          className="form__input"
          type={"text"}
          ref={inputRef}
          defaultValue="batman"
          placeholder="Enter name of the movie"
        />
        <button type="submit" className="form__searchbtn">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
