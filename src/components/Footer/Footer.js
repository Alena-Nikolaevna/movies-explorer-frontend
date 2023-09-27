import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>

      <div className="footer_info">
        <p className="footer__data">&copy; 2023</p>

        <nav>
          <ul className="footer__links">
            <li><a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a className="footer__link" href="https://github.com/Alena-Nikolaevna" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </nav>

      </div>
    </section>
  );
}

export default Footer;