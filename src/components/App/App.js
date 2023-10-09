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

  const navigate = useNavigate();

  //Переменная состояния - отвечающая за полученные данные из API(имя, о себе, аватар = data)
  // т.е. то, куда мы будем класть объект пользователя user
  // значение по умолчанию - объект {}
  const [currentUser, setCurrentUser] = useState({});


  //Переменная состояния, отвечает за отправку(чтобы прелоадер установить в момент запроса)
  // меняется на true в момент отправки
  // а потом в finally меняется на false(вне зависимости закончилась отправка с ошибкой или нет, 
  // мы убираем setIsSend )
  const [isSend, setIsSend] = useState(false);

  //Переменная состояния для отображения ошибок
  const [isError, setIsError] = useState(false);

  //Переменная состояния для проверки токена при каждом входе
  const [isCheckToken, setIsCheckToken] = useState(true);

  //Переменная состояния для отображения успешности в профиле при сохранении редактирования
  const [isSuccess, setIsSuccess] = useState(false);

  //Переменная состояния используется в логике редактирования профиля
  // стейт отвечает за отрисовку кнопки редактировать/сохранить
  // у меня это стейт в профиле isRedact
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Получаем данные пользователя с сервера
    if (localStorage.token) {
      Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getInitialMovies(localStorage.token)])
      .then(([userData, dataMovies]) => {
        setCurrentUser(userData);
        setSavedMovies(dataMovies);
        setLoggedIn(true);
      })
      .catch((err) => { console.log(err) });

    } else {
      setLoggedIn(false)
    }
  }, [loggedIn]);




  /*useEffect(() => {
     if (localStorage.token) {
       Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getInitialMovies(localStorage.token)])
         .then(([userData, dataMovies]) => {
           setSavedMovies(dataMovies.reverse())
           setCurrentUser(userData)
           setLoggedIn(true)
           setIsCheckToken(false)
         })
         .catch((err) => {
           console.log(err)
           setIsCheckToken(false)
           localStorage.clear()
         })
     } else {
       setLoggedIn(false)
       setIsCheckToken(false)
       localStorage.clear()
     }
   }, [loggedIn]);*/




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

  /** обработчик авторизации пользователя */
  function handleLogin(data) {
    // setIsSend(true)
    // return
    auth.login(data)
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
    // setIsSend(true)
    //return auth
    auth.register({ name, email, password })
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          auth.login({ email, password })
            .then((res) => {
              localStorage.setItem('token', res.token);
              setLoggedIn(true);
              navigate('/movies', { replace: true });
            })
            .catch((err) => {
              //  setIsError(true)
              console.log(`Ошибка авторизации ${err}`);
            })
          //  .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        //  setIsError(true)
        console.log(`Ошибка регистрвции ${err}`);
      })
    // .finally(() => setIsSend(false))
  }

  // удаление токена при выходе из аккаунта
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  //Обработчик сохранения данных пользователя
  function handleUpdateUser(data) {
    // Сохраняем данные пользователя
  //  setIsSend(true)
    mainApi.patchUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res)
        // setIsSuccess(true)
      })
      .catch((err) => { console.log(err) })
     // .finally(() => setIsSend(false))
  }

  useEffect(() => {
    handleCheckToken();
  }, []);


  // обработчик проверки пользователя, есть ли токен в localStorage
  function handleCheckToken() {

    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res)
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }




  //////////////////////////////////////////////


  /*function handleCardLike(movie) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = movie.likes.some(id => id === currentUser.id);
  }
  
    // Отправляем запрос в API и получаем обновлённые данные карточки
    function changeLikeCardStatus(movie.id, !isLiked) {
      .then((newMovie) => {
        setMovies((state) => state.map((c) => c.id === movie.id ? newMovie : c));
      })
      .catch((err) => { console.log(err) });
  }
  
  
  
  
  function handleCardLike(card) {
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
  function handleCardDelete(moviedelId) {
    mainApi.deleteMovie(moviedelId, localStorage.token)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => { return movie._id !== moviedelId }));
      })
      .catch((err) => { console.log(`Ошибка при удалении фильма ${err}`) });
  }

  /////////////////////////////////////////////


  function checkCardLiked(data) {
    const isLikeMovie = savedMovies.some(element => data.id === element.movieId);
  //  console.log(isLikeMovie);
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
   // console.log(seachClickMovie);
    if (isLikeMovie) {
      handleCardDelete(seachClickMovie[0]._id)
    } else {
      mainApi.createNewMovie(data, localStorage.token)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
    
        .catch((err) => { console.log(`Ошибка при установке лайка ${err}`) });

    }
  }
  

  
 /* function createNewMovie(data) {
    mainApi
      .createNewMovie({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: 'https://api.nomoreparties.co' + data.image.url,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        // thumbnail: data.thumbnail,
        thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
        movieId: data.id,
      })
      .then((res) => {
        setSavedMovies([res.movie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([res.movie, ...savedMovies]));
      })
      .catch((err) => console.log(err));
  }*/

  //////////////////////////////////

  

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

             // setSavedMovies={setSavedMovies}
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
              handleUpdateUser={handleUpdateUser}


              handleLogout={handleLogout}
            />}
          />

          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </div>

    </CurrentUserContext.Provider >
  );
}

export default App;
