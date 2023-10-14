import React, { useEffect } from "react";
import { useCallback } from "react";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";

import moviesApi from "../../utils/MoviesApi";

function Movies({ savedMovies, checkCardLiked }) {

  // когда уходит первый самый запрос на апи яндекса, у нас будет прелоадер
  // на все остальные поиски у нас уже лежит в нашем movies dct фильмы/ и  уже прелоадера не будет
  const [isLoading, setIsLoading] = useState(false);

  //Переменная состояния для карточек (список фильмов)
  const [listMovies, setListMovies] = useState([]);

  // для строки поиска из инпута и записывать в локал сторедж
  const [searchInput, setSearchInput] = useState('');

  //за состояние переключения короткометражек
  const [statusShort, setStatusShort] = useState(false);

  // длдя отрисовки фильмов фильтры
  const [filterListFilms, setFilterListFilms] = useState([]);

  //для серверной ошибки при запросе фильмов
  const [serverError, setServerError] = useState(false);

  const filterFilms = useCallback((search, statusShort, movies) => {
    setSearchInput(search);
    localStorage.setItem("text", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(statusShort));
    localStorage.setItem("movies", JSON.stringify(movies));

    setFilterListFilms(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return statusShort ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    if (listMovies.length === 0) {
      setIsLoading(true);
      // Получаем фильмы
      moviesApi.getMoviesApi()
        .then((res) => {
          setListMovies(res);
          setStatusShort(false);
          setServerError(false);
          filterFilms(search, statusShort, res);
        })
        .catch((err) => {
          setServerError(true);
          console.log(`Ошибка при поиске фильмов ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filterFilms(search, statusShort, listMovies);
    };
  };

  function toggleSwitchShort() {
    if (statusShort) {
      setStatusShort(false);
      filterFilms(searchInput, false, listMovies);
    } else {
      setStatusShort(true);
      filterFilms(searchInput, true, listMovies);
    };
  };

  useEffect(() => {
    if (localStorage.movies && localStorage.shorts && localStorage.text) {
      const movies = JSON.parse(localStorage.movies);
      const search = JSON.parse(localStorage.text);
      const statusShort = JSON.parse(localStorage.shorts);

      setServerError(false);
      setListMovies(movies);
      setSearchInput(search);
      setStatusShort(statusShort);

      filterFilms(search, statusShort, movies);
    }
  }, [filterFilms]);

  return (
    <>
      <Header className="header" />

      <main className="movies">
        <SearchForm
          handleMovies={handleMovies}
          toggleSwitchShort={toggleSwitchShort}
          searchInput={searchInput}
        // isCheck={isCheck}
        // savedMovies={savedMovies}
        />

        <MoviesCardList
          savedMovies={savedMovies}
          checkCardLiked={checkCardLiked}
          isLoading={isLoading}
          searchInput={searchInput}
          filterListFilms={filterListFilms}
          serverError={serverError}
        />
      </main>

      <Footer />
    </>
  );
};

export default Movies;