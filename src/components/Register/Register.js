import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

function Register() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const [isValue, setIsValue] = useState(false);

  function handleRegisterSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    setName(!name);
    setEmail(!email);
    setPassword(!password);
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
          <div className="register__header-logo"></div>
        </Link>
      </div>

      <AuthForm
        title={"Добро пожаловать!"}
        handleSubmit={handleRegisterSubmit}
        button={"Зарегистрироваться"}
        classNameBtn={"auth__form-button-register auth__button"}
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
            value={name || ''}
            onChange={handleChangeName}
            required
            id="name"
          />
        </label>

        <label className="auth__form-label">Email
          <input
            className="auth__form-input"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            value={email || ''}
            onChange={handleChangeEmail}
            required
            id="email"
          />
        </label>

        <label className="auth__form-label">Пароль
          <input
            className="auth__form-input"
            type="password"
            placeholder="••••••••••••••"
            name="password"
            minLength="6"
            value={password || ''}
            onChange={handleChangePassword}
            required
            id="password"
          />
          <span className="auth__form-error">Что-то пошло не так...</span>
        </label>

      </AuthForm>

    </section>
  );
}

export default Register;