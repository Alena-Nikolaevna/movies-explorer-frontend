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

  
  //Переменная состояния для карточек (список фильмов)
  const [allMovies, setAllMovies] = useState([]);

  // длдя отрисовки фильмоы фильтры
const [filteredMovies, setFilteredMovies] = useState([]);

  // для строки поиска из инпута и записфывваапть в локал сторедж
  const [searchedMovie, setSearchedMovie] = useState('');

  //за состояние переключения короткометражек
const [isCheck, setIsCheck] = useState(false);

 // когда уходит первый самый запрос на апи яндекса, у нас будет прелоадер
 // на все остальные поиски у нас уже лежит в нашем movies dct фильмы/ и  уже прелоадера не будет
 const [isLoading, setIsLoading] = useState(false);

 //для серверной ошибки при запросе фильмов
 const [serverError, setServerError] = useState(false);



 const filter = useCallback((search, isCheck, movies) => {
  setSearchedMovie(search);
localStorage.setItem("movie", JSON.stringify(search));
localStorage.setItem("shorts", JSON.stringify(isCheck));
localStorage.setItem("allmovies", JSON.stringify(movies));

setFilteredMovies(movies.filter((movie) => {
  const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
  return isCheck ? (searchName && movie.duration <= 40) : searchName
}))
 }, [])


 function handleMovies(search) {
  if (allMovies.length === 0) {
    setIsLoading(true)
      // Получаем фильмы
  moviesApi.getMoviesApi()
  .then((res) => {
   setAllMovies(res)
   setIsCheck(false)
   setServerError(false)
   filter(search, isCheck, res)
  })
  .catch((err) => {
    setServerError(true)
    console.log(`Ошибка при поиске фильмов ${err}`)
  })
  .finally(() => setIsLoading(false))
  } else {
    filter(search, isCheck, allMovies)
  }
}


useEffect(() => {
  if (localStorage.allMovies && localStorage.shorts && localStorage.movie) {
    const movies = JSON.parse(localStorage.allMovies);
    const search = JSON.parse(localStorage.movie);
    const isCheck = JSON.parse(localStorage.shorts);

    setServerError(false)
    setSearchedMovie(search)
    setIsCheck(isCheck)
    setAllMovies(movies)
    filter(search, isCheck, movies)
  }
}, [filter])

function changeShort() {
  if (isCheck) {
    setIsCheck(false)
    filter(searchedMovie, false, allMovies)
   // localStorage.setItem('shorts', JSON.stringify(false))
  } else {
    setIsCheck(true)
    filter(searchedMovie, true, allMovies)
    //localStorage.setItem('shorts', JSON.stringify(true))
  }
}


  return (
    <>
      <Header className="header" />

      <main className="movies">
        <SearchForm
        handleMovies={handleMovies}
       // isCheck={isCheck}
        changeShort={changeShort}
        searchedMovie={searchedMovie}

      // savedMovies={savedMovies}
        />

        <MoviesCardList 

          savedMovies={savedMovies}

          movies={filteredMovies}
          isLoading={isLoading}
          serverError={serverError}

          checkCardLiked={checkCardLiked}
      
          />
      </main>

      <Footer />
    </>
  );
}

export default Movies;