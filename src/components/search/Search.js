import React, { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../../heroes/HeroCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getHeroByName } from "../../selectors/getHeroByName";

export const Search = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });
  const { searchText } = formValues;
  const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();

    history.push(`?q=${searchText}`);
  };
  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              className="form-control"
              placeholder="Find your hero"
              type="text"
              value={searchText}
              name="searchText"
              onChange={handleInputChange}
              autoComplete="off"
            ></input>
            <button
              type="submit"
              className="btn mt-3 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a Hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">
              There is no a hero with {q}
            </div>
          )}

          {heroesFiltered?.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
