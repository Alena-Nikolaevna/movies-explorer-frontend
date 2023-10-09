import React, { useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';

import useFormValidation from '../../../hook/UseFormValidation';
//import { useEffect } from 'react';

function SearchForm({ handleMovies, changeShort, searchedMovie, savedMovies }) {

    const { pathname } = useLocation();

   const { values, handleChange, resetForm } = useFormValidation();

   /* useEffect(() => {
        resetForm();
      }, [resetForm]);*/

      
      function handleMoviesSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        if (evt.target.search.value) {
            handleMovies(evt.target.search.value);
        }
        
      }

      useEffect(() => {
        if ((pathname === "/saved-movies" && savedMovies.length === 0)) {
            resetForm({ search: '' })
        } else {
            resetForm({ search: searchedMovie })
        }
      }, [searchedMovie, resetForm, pathname, savedMovies])

    

    return (

        <section className="searchform">

            <form noValidate className="searchform__form" onSubmit={handleMoviesSubmit}>

                <div className="searchform__container">
                    <input
                   
                    name='search'
                    className="searchform__input"
                    type="text"
                    placeholder="Фильм"
                    minLength="1"
                    value={values.search || ''}
                    onChange={(evt) => {
                        handleChange(evt)
                    }}
                    required />
                    <button className={`searchform__submit-btn ${savedMovies ? (pathname === "/saved-movies" && savedMovies.length === 0) : ''}`} type="submit">Найти</button>
                </div>

                <div className="searchform__checkbox-container" onClick={changeShort}>
                    <label className="searchform__label">
                        <input className="searchform__checkbox-item" type="checkbox" id="checkbox" name="checkbox"></input>
                        <span className="searchform__label-text">Короткометражки</span>
                    </label>
                </div>

            </form>
        </section>
    );
}

export default SearchForm;