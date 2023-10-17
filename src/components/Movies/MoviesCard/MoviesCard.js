import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import durationFilm from "../../../utils/durationFilm.js";

function MoviesCard({ movie, savedMovies, handleCardDelete, checkCardLiked }) {

    const { pathname } = useLocation();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (pathname === "/movies")
            setIsLiked(savedMovies.some(element => movie.id === element.movieId))
    }, [savedMovies, movie.id, setIsLiked, pathname]);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    /* const cardLikeButtonClassName = (
         `moviesсard__btn ${isLiked ? "moviesсard__btn_type_like-active" : "moviesсard__btn_type_like-disable"}`
     );*/

    function handleLikeClick() {
        if (savedMovies.some(element => movie.id === element.movieId)) {
            setIsLiked(true);
            checkCardLiked(movie)
        } else {
            setIsLiked(false)
            checkCardLiked(movie)
        }
    }

    return (

        <article className="moviesсard">

            <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                <img className="moviesсard__image" alt={movie.nameRU}
                    src={pathname === "/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                />
            </a>

            <div className="moviesсard__container">
                <h2 className="moviesсard__title">{movie.nameRU}</h2>

                {pathname === "/movies" ?
                    <button className={`moviesсard__btn ${isLiked ? "moviesсard__btn_type_like-active" : ""}`} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                    :
                    <button className="moviesсard__btn moviesсard__btn_type_delete" type="button" aria-label="Удалить фильм" onClick={() => handleCardDelete(movie._id)}></button>
                }
            </div>

            <p className="moviesсard__count-like">{durationFilm(movie.duration)}</p>

        </article>
    );
}

export default MoviesCard;