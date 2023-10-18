import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
                            <NavLink className={({ isActive }) => `navigation__heading ${isActive ? 'navigation__heading_active' : ""}`} to="/">Главная</NavLink>
                            <NavLink className={({ isActive }) => `navigation__heading ${isActive ? 'navigation__heading_active' : ""}`} to="/movies">Фильмы</NavLink>
                            <NavLink className={({ isActive }) => `navigation__heading ${isActive ? 'navigation__heading_active' : ""}`} to="/saved-movies">Сохранённые фильмы</NavLink>
                        </div>

                        <Link className="navigation__account" to="/profile">
                            <div className="navigation__account-text">Аккаунт
                                <p className="navigation__account-icon"></p>
                            </div>
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