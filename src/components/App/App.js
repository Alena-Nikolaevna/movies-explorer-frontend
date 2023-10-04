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

import * as auth from "../../utils/Auth";

// import moviesApi from '../../utils/MoviesApi';

import { Routes, Route } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

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
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** обработчик регистрации пользователя */
  function handleRegister(data) {
    return auth
      .register(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // обработчик проверки пользователяБ, есть ли токен в localStorage
  function handleCheckToken() {

    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);


    //Обработчик сохранения данных пользователя -??
    function handleUpdateUser(data) {
      // Сохраняем данные пользователя
      mainApi.patchUserInfo(data)
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => { console.log(err) });
    }


  return (

    //«Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile handleUpdateUser={handleUpdateUser} />} />

          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
