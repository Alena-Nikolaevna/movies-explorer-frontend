import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <section className="notfound">
            <div className="notfound__container">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__subtitle">Страница не найдена</p>
            </div>
            <Link to='/' className="notfound__buttonlink">Назад</Link>
        </section>
    );
}

export default PageNotFound;