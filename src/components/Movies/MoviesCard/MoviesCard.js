import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";


function MoviesCard({ data, savedMovies, handleCardDelete, checkCardLiked }) {

    const { pathname } = useLocation();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (pathname === "/movies")
        setIsLiked(savedMovies.some(element => data.id === element.movieId))
    }, [savedMovies, data.id, setIsLiked, pathname]);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
   /* const cardLikeButtonClassName = (
        `moviesсard__btn ${isLiked ? "moviesсard__btn_type_like-active" : "moviesсard__btn_type_like-disable"}`
    );*/

    function handleLikeClick() {
        if (savedMovies.some(element => data.id === element.movieId)) {
            setIsLiked(true);
            checkCardLiked(data)
        } else {
            setIsLiked(false)
            checkCardLiked(data)
        }
    }


    ////////////////////////

    //////////////

    return (

        <article className="moviesсard">

            <Link to={data.trailerLink} target='_blank'>
                <img className="moviesсard__image"
             //   src={movie.image.url ? 'https://api.nomoreparties.co' + movie.image.url : movie.image}
             src={pathname === "/movies" ? `https://api.nomoreparties.co${data.image.url}` : data.image}
                    alt={data.nameRU}
                />
            </Link>

            <div className="moviesсard__container">
                <h2 className="moviesсard__title">{data.nameRU}</h2>

                {pathname === "/movies" ?
                    <button className={`moviesсard__btn ${isLiked ? "moviesсard__btn_type_like-active" : ""}`} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                :

            
                    <button className="moviesсard__btn moviesсard__btn_type_delete" type="button" aria-label="Удалить фильм" onClick={() => handleCardDelete(data._id)}></button>
                }
            </div>

            <p className="moviesсard__count-like">{data.duration}</p>

        </article>
    );
}

export default MoviesCard;