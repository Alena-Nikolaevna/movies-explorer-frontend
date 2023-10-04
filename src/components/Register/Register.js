import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import useFormValidation from "../../hook/UseFormValidation";
import { useEffect } from "react";


function Register({ ...props }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();


  useEffect(() => {
    resetForm();
  }, [resetForm]);


  function handleRegisterSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.handleRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  /* function handleChangeName(evt) {
     setName(evt.target.value);
   }
 
   function handleChangeEmail(evt) {
     setEmail(evt.target.value);
   }
 
   function handleChangePassword(evt) {
     setPassword(evt.target.value);
   }*/

  return (
    <section className="register">

      <div className="register__logo">
        <Link to="/">
          <div className="register__header-logo"></div>
        </Link>
      </div>

      <AuthForm
        title={"Добро пожаловать!"}
        handleSubmit={handleRegisterSubmit}
        button={"Зарегистрироваться"}
        text={"Уже зарегистрированы?"}
        link={"Войти"}
        links={"/signin"}
      >

        <label className="auth__form-label">Имя
          <input
            className="auth__form-input"
            type="text"
            placeholder="Виталий"
            name="name"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
            required
            id="name"
          />
          <span className={`auth__form-error ${!isValid && errors.name ? "auth__form-error_active" : ""}`}>
            {errors.name || ""}</span>
        </label>

        <label className="auth__form-label">Email
          <input
            className="auth__form-input"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            required
            id="email"
          />
          <span className={`auth__form-error ${!isValid && errors.email ? "auth__form-error_active" : ""}`}>
            {errors.email || ""}</span>
        </label>

        <label className="auth__form-label">Пароль
          <input
            className="auth__form-input"
            type="password"
            placeholder="••••••••••••••"
            name="password"
            minLength="6"
            value={values.password || ''}
            onChange={handleChange}
            required
            id="password"
          />
          <span className={`auth__form-error ${!isValid && errors.password ? "auth__form-error_active" : ""}`}>
            {errors.password || ""}</span>
        </label>

      </AuthForm>

    </section>
  );
}

export default Register;