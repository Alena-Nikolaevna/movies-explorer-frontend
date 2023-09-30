import React from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
    const { pathname } = useLocation();

    return (

        <section className="moviescardlist">

            <ul className="moviescardlist__cards">
                {props.cards.map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        description={movie.description}
                        image={movie.image}
                        duration={movie.duration}
                    />))}
            </ul>

            <div className="moviescardlist__btn-container">
                {pathname === "/movies" && <button className="moviescardlist__btn" type="button">Ещё</button>}
            </div>
        </section>
    );
}

export default MoviesCardList;

