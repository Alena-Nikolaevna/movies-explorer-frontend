import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/">
                <div className="header__logo"></div>
            </Link>

            <div className="header__container">
                <Link to="/signup" className="header__register">Регистрация</Link>
                <Link to="/signin" className="header__login">Войти</Link>
            </div>
        </header>
    );
}
export default Header;