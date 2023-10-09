import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState, useCallback } from "react";
import { useEffect } from "react";

//import savedMoviesCards from "../../utils/SavedMoviesCards";

function SavedMovies({ savedMovies, handleCardDelete }) {

// длдя отрисовки фильмоы фильтры
const [filteredMovies, setFilteredMovies] = useState(savedMovies);

 // для строки поиска из инпута и записфывваапть в локал сторедж
 const [searchedMovie, setSearchedMovie] = useState("");

  //за состояние переключения короткометражек
  const [isCheck, setIsCheck] = useState(false);


  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <=40) : searchName
    }))
     }, [])
    

     function handleMovies(search) {
      filter(search, isCheck, savedMovies)
     }

     useEffect(() => {
      filter(searchedMovie, isCheck, savedMovies)
     }, [filter, savedMovies, isCheck, searchedMovie])

     function changeShort() {
      if (isCheck) {
        setIsCheck(false)
        filter(searchedMovie, false, savedMovies)
      } else {
        setIsCheck(true)
        filter(searchedMovie, true, savedMovies)
      }
    }

  return (
    <>
      <Header className="header" />

      <main className="savedmovies">
        <SearchForm 
        handleMovies={handleMovies}

       // searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        changeShort={changeShort}
        savedMovies={savedMovies}
        isCheck={isCheck}
        />
        
        <MoviesCardList 
   
       // savedMovies={savedMovies}
       movies={filteredMovies}
       handleCardDelete={handleCardDelete}
        />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;