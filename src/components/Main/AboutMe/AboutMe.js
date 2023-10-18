import React from "react";
import "./AboutMe.css";
//import aboutmefoto from "../../../images/foto-student_pic.svg";
import aboutmefoto from "../../../images/IMG_20210722_151005.jpg";

function AboutMe() {
  return (

    <section className="aboutme">
      <h2 className="aboutme__title">Студентка</h2>

      <div className="aboutme__container">

        <div className="aboutme__info">
          <h3 className="aboutme__name">Алена</h3>
          <h4 className="aboutme__heading">Фронтенд-разработчик</h4>
          <p className="aboutme__text">Я родилась в Кузбассе. Моя специальность связана с автотранспортными перевозками.
            В душе&#x301; меломанка - люблю слушать музыку, а также путешествовать. Совсем недавно погрузилась в "код", ранее никогда разработкой не занималась.
            Решила пройти курс по веб-разработке, так как это давняя идея, мечта. Было увлекательно и очень сложно одновременно. В будущем надеюсь начать изучение более углубленно.</p>
          <a className="aboutme__link" href="https://github.com/Alena-Nikolaevna" target="_blank" rel="noreferrer">Github</a>
        </div>

        <img className="aboutme__foto" src={aboutmefoto} alt="Фотография студента, выполнившего дипломный проект."></img>

      </div>
    </section>
  );
}

export default AboutMe;