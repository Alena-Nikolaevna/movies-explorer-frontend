import React, { useEffect, useState } from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

import { Max_Width_Screen, Center_Width_Screen, Mobile_Width_Screen } from "../../../utils/constants";
import displayMovies from "../../../utils/displayMovies.js";

function MoviesCardList({ filterListFilms, savedMovies, isLoading, serverError, handleCardDelete, checkCardLiked, searchInput }) {
    const { pathname } = useLocation();
    const [isNumber, setIsNumber] = useState('');
    const movies = filterListFilms.slice(0, isNumber);

    useEffect(() => {
        if (pathname === "/movies") {
            setIsNumber(displayMovies().cards);

            function resizeDisplayMovies() {
                if (window.innerWidth >= Max_Width_Screen) {
                    setIsNumber(displayMovies().cards)
                }
                if (window.innerWidth < Max_Width_Screen) {
                    setIsNumber(displayMovies().cards)
                }
                if (window.innerWidth < Center_Width_Screen) {
                    setIsNumber(displayMovies().cards)
                }
                if (window.innerWidth < Mobile_Width_Screen) {
                    setIsNumber(displayMovies().cards)
                }
            }
            window.addEventListener("resize", resizeDisplayMovies);
            return () => window.removeEventListener("resize", resizeDisplayMovies);
        }
    }, [pathname, filterListFilms])


    function handleAddButtonClick() {
        setIsNumber(isNumber + displayMovies().add);
    }

    return (

        <section className="moviescardlist">

            <ul className="moviescardlist__cards">

                {isLoading ? <Preloader /> :


                    (pathname === "/movies" && movies.length !== 0) ?

                        movies.map((movie) => {
                            return (
                                <MoviesCard
                                    key={movie.id}
                                    movie={movie}
                                    checkCardLiked={checkCardLiked}
                                    savedMovies={savedMovies}
                                />
                            )
                        }) : filterListFilms.length !== 0 ?
                        filterListFilms.map((movie) => {
                                return (
                                    <MoviesCard
                                        key={movie._id}
                                        movie={movie}
                                        handleCardDelete={handleCardDelete}
                                    />
                                )
                            }) : serverError ?

                                <span className="moviescardlist__error">«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»</span>
                                : (pathname === "/movies" && searchInput.length === 0) ?
                                    <span className="moviescardlist__error">«Для получения списка фильмов выполните поиск»</span>


                                    : pathname === "/movies" ?
                                        <span className='moviescardlist__error'>«Ничего не найдено.<br></br>
                                            Для получения списка фильмов выполните верный поиск»</span>
                                        :
                                        <span className='moviescardlist__error'>«Нет сохраненных фильмов»</span>
                }
            </ul>

            <div className="moviescardlist__btn-container">
                {pathname === "/movies" && <button className={`moviescardlist__btn ${isNumber >= filterListFilms.length && "moviescardlist__btn_hidden"}`} onClick={handleAddButtonClick} type="button">Ещё</button>}
            </div>
        </section>
    );
}

export default MoviesCardList;

