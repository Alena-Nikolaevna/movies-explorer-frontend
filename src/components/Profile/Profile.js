import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isRedact, setIsRedact] = useState(false);

  function handleSubmitButton() {
    setIsRedact(!isRedact);
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <>
      <Header className="header" />

      <section className="profile">

        <h2 className="profile-heading">Привет, Виталий!</h2>
        <form className="profile__form">

          <label className="profile__form-label">Имя
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="text"
              placeholder="Виталий"
              name="name"
              minLength="2"
              maxLength="35"
              value={name || ''}
              onChange={handleChangeName}
              required
            />
          </label>

          <label className="profile__form-label">Email
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="email"
              placeholder="pochta@yandex.ru|"
              name="email"
              value={email || ''}
              onChange={handleChangeEmail}
              required
            />
          </label>

        </form>

        {isRedact ? (
          <div className="profile__save">
            <span className="profile__error">При обновлении профиля произошла ошибка.</span>
            <button className="profile__button-save" type="submit" onClick={handleSubmitButton}>Сохранить</button>
          </div>
        ) : (

          <div>
            <button className="profile__button-redact" type="submit" onClick={handleSubmitButton}>Редактировать</button>
            <p className="profile__link-text"><Link to="/" className="profile__link">Выйти из аккаунта</Link></p>
          </div>

        )}
      </section>
    </>
  );
}

export default Profile;