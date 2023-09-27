import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__heading">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <ul className="techs__table">
        <li className="techs__table-cell">HTML</li>
        <li className="techs__table-cell">CSS</li>
        <li className="techs__table-cell">JS</li>
        <li className="techs__table-cell">React</li>
        <li className="techs__table-cell">Git</li>
        <li className="techs__table-cell">Express.js</li>
        <li className="techs__table-cell">mongoDB</li>
      </ul>

    </section>
  );
}

export default Techs;