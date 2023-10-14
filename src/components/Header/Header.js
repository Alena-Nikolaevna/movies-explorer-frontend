import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, ...props }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { pathname } = useLocation();

    function handleBurgerOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (

        <header className={props.className}>
            <Link to="/">
                <div className="header__logo"></div>
            </Link>

            {!loggedIn ? (
                <>
                    {
                        pathname === "/" &&
                        <div className="header__container">
                            <Link to="/signup" className="header__register">Регистрация</Link>
                            <Link to="/signin" className="header__login">Войти</Link>
                        </div>
                    }
                </>
            ) : (

                <>
                    {
                        pathname === "/" &&
                        <>
                            <nav className="header__container-authorized">
                                <Link to="/movies" className="header__movies header__movies_green">Фильмы</Link>
                                <Link to="/saved-movies" className="header__saved-movies header__saved-movies_green">Сохранённые фильмы</Link>
                            </nav>

                            <Link className="header__account header__account_green" to="/profile">
                                <div className="header__account-text">Аккаунт
                                    <p className="header__account-icon"></p>
                                </div>
                            </Link>

                            <button className="header__button-open header__button-open_white" type="button" onClick={handleBurgerOpen} />

                            {isMenuOpen ? (
                                <Navigation />
                            ) : (
                                ""
                            )}
                        </>
                    }

                </>
            )}

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
                                <div className="header__account-text">Аккаунт
                                    <p className="header__account-icon"></p>
                                </div>
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