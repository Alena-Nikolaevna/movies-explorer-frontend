import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation(props) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    function handleBurgerOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (

        <nav className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>

            <button className="navigation__button-open" type="button" onClick={handleBurgerOpen} />

            <div className="navigation__container">
                <Link className='navigation__heading'>Главная</Link>
                <Link className='navigation__heading'>Фильмы</Link>
                <Link className="navigation__heading">Сохранённые фильмы</Link>
            </div>

            <Link className="navigation__account">
                <p className="navigation__account-text">Аккаунт
                    <span className="navigation__account-icon"></span>
                </p>
            </Link>

            <button className="navigation__button-close" type="button" />

        </nav>
    );
}

export default Navigation;