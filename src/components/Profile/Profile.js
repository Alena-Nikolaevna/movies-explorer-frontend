import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hook/UseFormValidation";
import { useEffect, useContext } from "react";


function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const [isRedact, setIsRedact] = useState(false);

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [resetForm, currentUser, isRedact]);

  /*const [name, setName] = useState("");
  const [email, setEmail] = useState("");*/

  /*React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);*/




  function handleSubmitButton(evt) {
    evt.preventDefault();

    props.handleUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  function handleClick() {
    setIsRedact(!isRedact);
  }

  return (
    <>
      <Header className="header" />

      <section className="profile">

        <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onClick={handleSubmitButton}>

          <label className="profile__form-label">Имя
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="text"
              placeholder="Виталий"
              name="name"
              minLength="2"
              maxLength="30"
              value={values.name}
              onChange={handleChange}
              required
              id="name"
              isValid={isValid}
            />
          </label>

          <label className="profile__form-label">Email
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="email"
              placeholder="pochta@yandex.ru|"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              id="email"
              isValid={isValid}
            />
          </label>



          {isRedact ? (
            <div className="profile__save">
              <span className="profile__error">При обновлении профиля произошла ошибка.</span>
              <button className="profile__button-save" type="submit" onClick={handleClick}>Сохранить</button>
            </div>
          ) : (

            <>
              <div>
                <button className="profile__button-redact" type="submit" onClick={handleClick}>Редактировать</button>
              </div>
              <p className="profile__link-text"><Link to="/" className="profile__link" onClick={props.handleLogout}>Выйти из аккаунта</Link></p>
            </>
          )}

        </form>
      </section>
    </>
  );
}

export default Profile;