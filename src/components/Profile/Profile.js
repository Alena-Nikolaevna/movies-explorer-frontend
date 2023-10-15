import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hook/UseFormValidation";
import { useEffect, useContext } from "react";


function Profile({ handleUpdateUser, isUpdateSuccessful, handleLogout, successful }) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const [isRedact, setIsRedact] = useState(false);

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [resetForm, currentUser, isRedact]);


  function handleSubmitButton(evt) {
    evt.preventDefault();
    handleUpdateUser({
      name: values.name,
      email: values.email,
    })
  }

  function handleClick() {
    setIsRedact(!isRedact);
  }

  return (
    <>
      <Header className="header" />

      <section className="profile">

        <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onClick={handleSubmitButton} noValidate>

          <label className="profile__form-label profile__form-label_bottom_active">Имя
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="text"
              placeholder="Виталий"
              name="name"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={handleChange}
              required
              id="name"
              //isValid={isValid}
              pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
            />

          </label>
          <span className={`profile__error ${!isValid && errors.name ? "profile__error_active" : ""}`}>
            {errors.name}</span>


          <label className="profile__form-label">Email
            <input
              disabled={!isRedact}
              className="profile__form-input"
              type="email"
              placeholder="pochta@yandex.ru|"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              required
              id="email"
              //  error={errors.email}
              // isValid={isValid}
              pattern='[a-z0-9_]+@[a-z]+.[a-z]{2,}'
            />

          </label>
          <span className={`profile__error ${!isValid && errors.email ? "profile__error_active" : ""}`}>
            {errors.email}</span>

          {isRedact ? (


            <div className="profile__save">

              <button className="profile__button-save" type="submit" onClick={handleClick} disabled={!isValid}>Сохранить</button>

            </div>
          ) : (
            <>
              {isUpdateSuccessful && <span className='profile__successful'> {successful()} Данные успешно сохранены</span>}
              <div>
                <button className="profile__button-redact" type="submit" onClick={handleClick}>Редактировать</button>
              </div>
              <p className="profile__link-text"><Link to="/" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</Link></p>
            </>
          )}

        </form>
      </section>
    </>
  );
}

export default Profile;