import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import savedMoviesCards from "../../utils/SavedMoviesCards";

function SavedMovies() {
  return (
    <>
      <Header className="header" />

      <main className="savedmovies">
        <SearchForm />
        <MoviesCardList cards={savedMoviesCards} />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;