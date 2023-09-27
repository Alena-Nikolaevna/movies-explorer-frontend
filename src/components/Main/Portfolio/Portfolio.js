import React from "react";
import "./Portfolio.css";
import portfoliostrelka from "../../../images/portfolio-strelka.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <ul className="portfolio__list">

        <li className="portfolio__text">
          <a className="portfolio__link" href="https://alena-nikolaevna.github.io/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт
            <img className="portfolio__strelka" src={portfoliostrelka} alt="Указатель стрелки"></img>
          </a>
        </li>

        <li className="portfolio__text">
          <a className="portfolio__link" href="https://alena-nikolaevna.github.io/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт
          <img className="portfolio__strelka" src={portfoliostrelka} alt="Указатель стрелки"></img>
          </a>
        </li>

        <li className="portfolio__text">
          <a className="portfolio__link" href="https://alena-nikolaevna.github.io/mesto" target="_blank" rel="noreferrer">Одностраничное приложение
          <img className="portfolio__strelka" src={portfoliostrelka} alt="Указатель стрелки"></img>
          </a>
        </li>

      </ul>
    </section>
  );
}

export default Portfolio;