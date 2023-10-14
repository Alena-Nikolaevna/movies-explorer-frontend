/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
// eslint-disable-next-line 

import React, { useCallback } from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './App.css';
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

//import Preloader from "../Movies/Preloader/Preloader";

//import Header from '../Header/Header';


import { Routes, Route } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as auth from "../../utils/Auth";
//import * as moviesApi from "../../utils/MoviesApi";
//import moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';

function App() {

  ////Переменная состояния, которая отвечает за то, что пользователь залогинился(после логина меняется на true)
  const [loggedIn, setLoggedIn] = useState(false);

  //Переменная состояния для сохраненных фильмов(будем сюда класть массив сохраненных фильмов)
  const [savedMovies, setSavedMovies] = useState([]);

  //const location = useLocation();
  //const { pathname } = location;
  const navigate = useNavigate();

  //Переменная состояния - отвечающая за полученные данные из API
  // значение по умолчанию - объект {}
  const [currentUser, setCurrentUser] = useState({});

  //Переменная состояния для проверки токена при каждом входе
  //const [isCheckToken, setIsCheckToken] = useState(true);

  //Переменная состояния для отображения успешности в профиле при сохранении редактирования
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);


  //Переменная состояния используется в логике редактирования профиля
  // стейт отвечает за отрисовку кнопки редактировать/сохранить
  // у меня это стейт в профиле isRedact
  const [isEdit, setIsEdit] = useState(false);

  //Переменная состояния для отображения ошибок
  const [isError, setIsError] = useState(false);

  //Переменные состояния для отображения текста ошибок
  const [isErrorTextLogin, setIsErrorTextLogin] = useState("");
  const [isErrorTextRegister, setIsErrorTextRegister] = useState("");
  //const [isErrorTextUser, setIsErrorTextUser] = useState("");








  useEffect(() => {

    if (localStorage.token) {
      Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getInitialMovies(localStorage.token)])
        .then(([userInfo, initialMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(initialMovies);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);

        });

    } else {
      setLoggedIn(false);

    }
  }, [loggedIn]);


  /*
  function handleMovies() {
    // Получаем фильмы
    moviesApi.getMoviesApi()
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('movies', JSON.stringify(res));
        setMovies(JSON.parse(localStorage.getItem('movies')) || []);
      })
      .catch((err) => { console.log(err) });*/
  /*moviesApi.getMoviesApi()
    .then((res) => {
     setLoggedIn(true);
       localStorage.setItem('movies', res.movies);
      setMovies((res) || []);
    })
    .catch((e) => console.log(e))
}*/
  ///////////////////////////////

  /** обработчик регистрации пользователя */
  function handleRegister({ name, email, password }) {
    auth.register({ name, email, password })
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          handleLogin({ email, password })
        }
      })

      .catch((err) => {
        setIsError(true);
        if (err === 409) {
          setIsErrorTextRegister("Пользователь с таким email уже существует.");
        };

        if (err === 500) {
          setIsErrorTextRegister("На сервере произошла ошибка.");
        };
        console.log(`Ошибка регистрации ${err}`);
      });
  }

  /** обработчик авторизации пользователя */
  function handleLogin(data) {
    auth.login(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setIsError(true);
        setIsErrorTextLogin("Вы ввели неправильный логин или пароль.")
        console.log(err);
      });
  }

  // удаление токена при выходе из аккаунта
  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  }



  
  function successful() {
    
    setTimeout(() => {
      setIsUpdateSuccessful(false);
    }, 1200);
  }

  //Обработчик сохранения данных пользователя
  function handleUpdateUser(data) {
    mainApi.patchUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        setIsUpdateSuccessful(true)
      })
      .catch((err) => {
        // setIsError(true)
        //  setIsErrorTextUser("Вы ввели неверные данные.")
        console.log(`Ошибка при обновлении профиля ${err}`)
      })
  }

  // проверка пользователя, есть ли токен в localStorage
  function handleCheckToken() {

    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res)
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  /*function handleCardLike(card) {
    if (checkCardLiked(card) === false) {
        likeAndSaveFilm(card);
    } else {
        removeFilm(card)
    }
  }
  
  function checkCardLiked(card) {
    const isLiked = savedCards.some((film) => {
        if (film.movieId === card.movieId) {
            return true ;
        }
        else {
            return false;
        }
    })
    return isLiked;
  }
  
  //Обработчик удаления своей карточки
  function handleCardDelete(movie) {
    mainApi.deleteCard(movie.id)
      .then(() => {
        setMovies(movies => movies.filter((c) => c.id !== movie.id));
        // closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }*/

  //Обработчик удаления своей карточки
  function handleCardDelete(film) {
    mainApi.deleteMovie(film, localStorage.token)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => { return movie._id !== film }));
      })
      .catch((err) => { console.log(`Ошибка при удалении фильма ${err}`) });
  }

  /////////////////////////////////////////////

  function checkCardLiked(movie) {
    const isLikeMovie = savedMovies.some(element => movie.id === element.movieId);

    const clickFilm = savedMovies.filter((film) => {
      return film.movieId === movie.id
    })

    if (isLikeMovie) {
      handleCardDelete(clickFilm[0]._id)
    } else {
      mainApi.createNewMovie(movie, localStorage.token)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })

        .catch((err) => { console.log(`Ошибка при установке лайка ${err}`) });
    }
  }

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
              savedMovies={savedMovies}
              checkCardLiked={checkCardLiked}
            />}
          />

          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              handleCardDelete={handleCardDelete}
            />}
          />

          <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              handleLogout={handleLogout}

              handleUpdateUser={handleUpdateUser}
              isUpdateSuccessful={isUpdateSuccessful}
              successful={successful}




            />}
          />

          <Route path="/signin" element={<Login handleLogin={handleLogin} isError={isError} isErrorTextLogin={isErrorTextLogin} />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} isError={isError} isErrorTextRegister={isErrorTextRegister} />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </div>

    </CurrentUserContext.Provider >
  );
}

export default App;
