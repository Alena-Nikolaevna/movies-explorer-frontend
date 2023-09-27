import React from "react";
import "./AboutMe.css";
import aboutmefoto from "../../../images/foto-student_pic.svg";

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>

      <div className="aboutme__container">

        <div className="aboutme__info">
          <h3 className="aboutme__name">Виталий</h3>
          <h4 className="aboutme__heading">Фронтенд-разработчик, 30 лет</h4>
          <p className="aboutme__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutme__link" href="https://github.com/Alena-Nikolaevna" target="_blank" rel="noreferrer">Github</a>
        </div>

        <img className="aboutme__foto" src={aboutmefoto} alt="Фотография студента, выполнившего дипломный проект."></img>

      </div>
    </section>
  );
}

export default AboutMe;