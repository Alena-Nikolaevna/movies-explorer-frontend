import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState, useCallback } from "react";
import { useEffect } from "react";

function SavedMovies({ savedMovies, handleCardDelete }) {

  // для строки поиска из инпута и записывать в локал сторедж
  const [searchInput, setSearchInput] = useState('');

  //за состояние переключения короткометражек
  const [statusShort, setStatusShort] = useState(false);

  // длдя отрисовки фильмов фильтры
  const [filterListFilms, setFilterListFilms] = useState([]);

  const filterFilms = useCallback((search, statusShort, movies) => {
    setSearchInput(search);
    setFilterListFilms(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return statusShort ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    filterFilms(search, statusShort, savedMovies);
  };

  function toggleSwitchShort() {
    if (statusShort) {
      setStatusShort(false);
      filterFilms(searchInput, false, savedMovies);
    } else {
      setStatusShort(true);
      filterFilms(searchInput, true, savedMovies);
    };
  };

  useEffect(() => {
    filterFilms(searchInput, statusShort, savedMovies);
  }, [filterFilms, savedMovies, statusShort, searchInput]);

  return (
    <>
      <Header className="header" />

      <main className="savedmovies">
        <SearchForm
          handleMovies={handleMovies}
          toggleSwitchShort={toggleSwitchShort}
          savedMovies={savedMovies}
          statusShort={statusShort}
          searchInput={searchInput}
        />

        <MoviesCardList
          // savedMovies={savedMovies}
          filterListFilms={filterListFilms}
          handleCardDelete={handleCardDelete}
        />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;