import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="aboutproject" id="aboutproject">
      <h2 className="aboutproject__title">О проекте</h2>

      <ul className="aboutproject__table">
        <li className="table__cell">
          <h3 className="table__heading">Дипломный проект включал 5 этапов</h3>
          <p className="table__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>

        <li className="table__cell">
          <h3 className="table__heading">На выполнение диплома ушло 5 недель</h3>
          <p className="table__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <div className="aboutproject__time">
        <h4 className="aboutproject__week-one">1 неделя</h4>
        <h4 className="aboutproject__week-four">4 недели</h4>
        <p className="aboutproject__type-backend">Back-end</p>
        <p className="aboutproject__type-frontend">Front-end</p>
      </div>

    </section >
  );
}

export default AboutProject;