/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
// eslint-disable-next-line 

import React from 'react';

import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

import './App.css';
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

//import Header from '../Header/Header';

import * as auth from "../../utils/Auth";

// import moviesApi from '../../utils/MoviesApi';

import { Routes, Route } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
 // const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();


  //Переменная состояния - отвечающая за полученные данные из API(имя, о себе, аватар = data)
  const [currentUser, setCurrentUser] = useState({});

  //Переменная состояния для карточек (список карточек)
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Получаем данные пользователя с сервера
    mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => { console.log(err) });

    // Получаем фильмы
    mainApi.getInitialMovies()
      .then((res) => {
        setMovies(res)
      })
      .catch((err) => { console.log(err) });
  }, []);


  /** обработчик авторизации пользователя */
  function handleLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** обработчик регистрации пользователя */
  function handleRegister({ name, email, password }) {
    return auth
      .register({ name, email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка регистрвции ${err}`);
      });
  }


 function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  //Обработчик сохранения данных пользователя
  function handleUpdateUser(data) {
    // Сохраняем данные пользователя
    mainApi.patchUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => { console.log(err) });
  }

  // обработчик проверки пользователя, есть ли токен в localStorage
  function handleCheckToken() {

    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res)
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
        )
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);





  return (

    //«Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Routes>

          <Route path="/" element={<Main loggedIn={loggedIn} />} />

          <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
            />}
          />

          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
            />}
          />

          <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              handleUpdateUser={handleUpdateUser}
              
              handleLogout={handleLogout}
            />}
          />

          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
