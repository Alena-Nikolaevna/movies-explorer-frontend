import React, { useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';

import useFormValidation from '../../../hook/UseFormValidation';

function SearchForm({ handleMovies, toggleSwitchShort, searchInput, savedMovies, statusShort }) {

    const { pathname } = useLocation();

    const { values, handleChange, resetForm, errors } = useFormValidation();

    function handleMoviesSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        handleMovies(evt.target.search.value);
    };

    useEffect(() => {
        if ((pathname === "/saved-movies" && savedMovies.length === 0)) {
            resetForm({ search: '' });
        } else {
            resetForm({ search: searchInput });
        }
    }, [searchInput, resetForm, pathname, savedMovies]);

    return (

        <section className="searchform">

            <form className="searchform__form" onSubmit={handleMoviesSubmit} noValidate>

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
                        required
                    />

                    <span className="search-form__error">{errors.search || ''}</span>

                    <button className={`searchform__submit-btn ${savedMovies ? (pathname === "/saved-movies" && savedMovies.length === 0) : ''}`} type="submit">Найти</button>
                </div>

                <div className="searchform__checkbox-container" onClick={toggleSwitchShort}>
                    <label className="searchform__label">
                        <input className="searchform__checkbox-item" type="checkbox" id="checkbox" name="checkbox" checked={statusShort}></input>
                        <span className="searchform__label-text">Короткометражки</span>
                    </label>
                </div>

            </form>
        </section>
    );
};

export default SearchForm;