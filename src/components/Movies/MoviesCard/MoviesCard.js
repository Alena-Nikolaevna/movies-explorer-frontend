import React from "react";
import "./MoviesCard.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

    const { pathname } = useLocation();
    const [isLiked, setIsLiked] = useState(false);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `moviesсard__btn ${isLiked ? "moviesсard__like-btn_active" : "moviesсard__like-btn_no"}`
    );

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    return (

        <article className="moviesсard">

            <img className="moviesсard__image" src={props.image} alt={props.description} />

            <div className="moviesсard__container">
                <h2 className="moviesсard__title">{props.description}</h2>

                {pathname === "/movies" &&
                    <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                }

                {pathname === "/saved-movies" &&
                    <button className="moviesсard__btn moviesсard__delete-btn" type="button" aria-label="Удалить фильм"></button>
                }
            </div>

            <p className="moviesсard__count-like">{props.duration}</p>

        </article>
    );
}

export default MoviesCard;