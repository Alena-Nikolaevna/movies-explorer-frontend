import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    setEmail(!email);
    setPassword(!password);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="login">

      <div className="login__logo">
        <Link to="/">
          <div className="header__logo"></div>
        </Link>
      </div>

      <AuthForm
        title={"Рады видеть!"}
        handleSubmit={handleLoginSubmit}
        button={"Войти"}
        classNameBtn={"auth__form-button-login button"}
        text={"Ещё не зарегистрированы?"}
        link={"Регистрация"}
        links={"/signup"}
      >

        <label className="auth__form-label">Email
          <input
            className="auth__form-input"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            value={email || ''}
            onChange={handleChangeEmail}
            required
          />
        </label>

        <label className="auth__form-label">Пароль
          <input
            className="auth__form-input"
            type="password"
            name="password"
            minLength="6"
            maxLength="16"
            value={password || ''}
            onChange={handleChangePassword}
            required
          />
        </label>

      </AuthForm>

    </section>
  );
}

export default Login;