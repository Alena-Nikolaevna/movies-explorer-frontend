import React from "react";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
//import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import moviesCards from "../../utils/MoviesCards";

function Movies() {

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cards={moviesCards} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;