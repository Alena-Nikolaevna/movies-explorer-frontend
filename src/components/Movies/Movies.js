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