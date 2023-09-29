import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navigation() {

    const [isMenuClose, setIsMenuClose] = useState(false);

    function handleBurgerClose() {
        setIsMenuClose(!isMenuClose);
    }

    return (
        <>
            {!isMenuClose ? (
                <section className="navigation">

                    <div className="navigation__overlay" />
                    <nav className="navigation__nav-link">
                        <div className="navigation__container">
                            <Link className="navigation__heading" to="/">Главная</Link>
                            <Link className="navigation__heading" to="/movies">Фильмы</Link>
                            <Link className="navigation__heading" to="/saved-movies">Сохранённые фильмы</Link>
                        </div>

                        <Link className="navigation__account" to="/profile">
                            <p className="navigation__account-text">Аккаунт
                                <div className="navigation__account-icon"></div>
                            </p>
                        </Link>

                        <button className="navigation__button-close" type="button" onClick={handleBurgerClose} />

                    </nav>
                </section>
            ) : (
                ""
            )}
        </>
    );
}

export default Navigation;