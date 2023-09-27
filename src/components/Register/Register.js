import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Register(props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.handleRegister({ name, email, password });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="register">

      <div className="register__logo">
        <Link to="/">
          <div className="header__logo"></div>
        </Link>
      </div>

      <AuthForm
        title={"Добро пожаловать!"}
        handleSubmit={handleSubmit}
        button={"Зарегистрироваться"}
        classNameBtn={"auth__form-button-register button"}
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
            maxLength="35"
            // value={props.email || ''}
            onChange={handleChangeName}
            required
          />
        </label>

        <label className="auth__form-label">Email
          <input
            className="auth__form-input"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            // value={props.email || ''}
            onChange={handleChangeEmail}
            required
          />
        </label>

        <label className="auth__form-label">Пароль
          <input
            className="auth__form-input"
            type="password"
            placeholder="••••••••••••••"
            name="password"
            minLength="6"
            maxLength="16"
            // value={props.password || ''}
            onChange={handleChangePassword}
            required
          />
          <span className="auth__form-error">Что-то пошло не так...</span>
        </label>

      </AuthForm>


    </section>
  );
}

export default Register;