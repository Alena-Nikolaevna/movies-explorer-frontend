import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (

        <section className="searchform">

            <form className="searchform__form">

                <div className="searchform__container">
                    <input className="searchform__input" type="text" placeholder="Фильм" minLength="1" required />
                    <button className="searchform__submit-btn" type="submit">Найти</button>
                </div>

                <div className="searchform__checkbox-container">
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