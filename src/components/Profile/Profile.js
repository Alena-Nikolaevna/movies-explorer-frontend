import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile(props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.handleRegister({ name, email });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <>

      <Header />
      <section className="profile">

        <h2 className="profile-heading">Привет, Виталий!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>

          <label className="profile__form-label">Имя
            <input
              className="profile__form-input"
              type="text"
              placeholder="Виталий"
              name="name"
              minLength="2"
              maxLength="35"
              value={props.name || ''}
              onChange={handleChangeName}
              required
            />
          </label>

          <label className="profile__form-label">Email
            <input
              className="profile__form-input"
              type="email"
              placeholder="pochta@yandex.ru|"
              name="email"
              value={props.email || ''}
              onChange={handleChangeEmail}
              required
            />
          </label>

        </form>

        <button className="profile__form-button" type="submit">Редактировать</button>
        <p className="profile__link-text"><Link to="/" className="profile__link">Выйти из аккаунта</Link></p>

      </section>
    </>
  );
}

export default Profile;