import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import useFormValidation from "../../hook/UseFormValidation";
import { useEffect } from "react";

function Login({ ...props }) {
  //const [email, setEmail] = React.useState("");
  //const [password, setPassword] = React.useState("");

  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();


  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleLoginSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    props.handleLogin({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <section className="login">

      <div className="login__logo">
        <Link to="/">
          <div className="login__header-logo"></div>
        </Link>
      </div>

      <AuthForm
        title={"Рады видеть!"}
        handleSubmit={handleLoginSubmit}
        button={"Войти"}
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

export default Login;