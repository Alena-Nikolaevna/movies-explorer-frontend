import React, { useEffect, useState } from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, savedMovies, isLoading, serverError, handleCardDelete, checkCardLiked }) {
    const { pathname } = useLocation();
    const [ count, setCount ] = useState('');
    const fact = movies.slice(0, count);

   
    function clickMore() {
        setCount(count + printCards().step)
    }

    return (

        <section className="moviescardlist">

            <ul className="moviescardlist__cards">

                {isLoading ? <Preloader /> :
                    (pathname === "/movies" && fact.length !== 0) ?

                        fact.map(data => {
                            return (
                                <MoviesCard
                                    key={data.id}
                                    
                                    data={data}
                                    savedMovies={savedMovies}
                                    checkCardLiked={checkCardLiked}
                               
                    
                                  
                                />
                            )
                        }) : movies.length !== 0 ?
                            movies.map((data) => {
                                return (
                                    <MoviesCard
                                        key={data._id}

                                      //  createNewMovie={createNewMovie}
                                        data={data}
                                        handleCardDelete={handleCardDelete}
                                      
                                    />
                                )
                            }) : serverError 
                            
                            ?
                                <span className='error-film'>Во время запроса произошла ошибка</span>
                                : pathname === "/movies" ?
                                    <span className='error-film'>Чтобы увидеть фильмы, выполните поиск</span>
                                    :
                                    <span className='error-film'>Нет сохраненных фильмов</span>
                }
            </ul>

            <div className="moviescardlist__btn-container">
                {pathname === "/movies" && <button className={`moviescardlist__btn ${count >= movies.length && "moviescardlist__btn_hidden"}`} onClick={clickMore} type="button">Ещё</button>}
            </div>
        </section>
    );
}

export default MoviesCardList;

