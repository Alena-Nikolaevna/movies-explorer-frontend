import React from "react";
import "./Promo.css";
import promologo from "../../../images/promo-landing-logo.svg";

function Promo() {
  return (
    <section className='promo'>

      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-sразработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__button" type="button"><a className="promo__link" href="#aboutproject">Узнать больше</a></button>
      </div>

      <img className="promo__illustration" src={promologo} alt="Иллюстрация: глобус с буквами" />
    </section>
  );
}

export default Promo;