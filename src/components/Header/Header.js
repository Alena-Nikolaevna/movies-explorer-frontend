import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header(props) {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleBurgerOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    const { pathname } = useLocation();

    return (
        <header className={props.className}>
            <Link to="/">
                <div className="header__logo"></div>
            </Link>

            {
                pathname === "/" &&
                <div className="header__container">
                    <Link to="/signup" className="header__register">Регистрация</Link>
                    <Link to="/signin" className="header__login">Войти</Link>
                </div>
            }

            {
                pathname === "/movies" ||
                    pathname === "/saved-movies" ||
                    pathname === "/profile" ?
                    (
                        <>
                            <nav className="header__container-authorized">
                                <Link to="/movies" className="header__movies">Фильмы</Link>
                                <Link to="/saved-movies" className="header__saved-movies">Сохранённые фильмы</Link>
                            </nav>

                            <Link className="header__account" to="/profile">
                                <p className="header__account-text">Аккаунт
                                    <div className="header__account-icon"></div>
                                </p>
                            </Link>

                            <button className="header__button-open" type="button" onClick={handleBurgerOpen} />

                            {isMenuOpen ? (
                            <Navigation />
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        ""
                    )
            }
        </header >
    );
}
export default Header;