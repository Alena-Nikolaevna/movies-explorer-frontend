import React from "react";
import "./PageNotFound.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageNotFound() {

    const navigateButton = useNavigate();
    const buttonLink = () => navigateButton(-1);

    return (
        <section className="notfound">
            <div className="notfound__container">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__subtitle">Страница не найдена</p>
            </div>
            <button type="button" className="notfound__buttonlink" onClick={buttonLink}>Назад</button>
        </section>
    );
}

export default PageNotFound;