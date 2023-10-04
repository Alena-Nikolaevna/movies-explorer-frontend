class MainApi {
    constructor(setting) {
      this._address = setting.baseUrl;
      this._headers = setting.headers;
    }
  
    // ф-ция проверки результата
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }
    
    // загружаем информацию о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    // получить список всех карточек в виде массива (GET)
    // загружаем карточки с сервера
    getInitialMovies() {
      return fetch(`${this._address}/movies`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    // отправляем/сохраняем данные пользователя на сервер 
    // заменяем данные пользователя
    patchUserInfo(data) {
      return fetch(`${this._address}/users/me/`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        })
      }).then(this._checkResponse);
    }
  
    // добавление новой карточки 
    // ???????????????
    createNewMovie(data) {
      return fetch(`${this._address}/movies`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: data.image,
            trailerLink: data.trailerLink,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
            thumbnail: data.thumbnail,
            movieId: data.movieId,
        })
      }).then(this._checkResponse);
    }
  
    // удаление карточки
    deleteMovie(movieId) {
      return fetch(`${this._address}/movies/${movieId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
  }
  
  const mainApi = new MainApi({
    baseUrl: "https://api.movies-ank.nomoreparties.co",
    headers: {
    //  authorization: 'cb45d759-f4af-4749-b096-7ca0c6bdc881',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });
  
  export default mainApi;
  
  /*- получить список всех карточек в виде массива (GET) +
  - добавить карточку (POST)
  - удалить карточку (DELETE)
  - получить данные пользователя (GET) +-
  - заменить данные пользователя (PATCH) +
  - заменить аватар (PATCH)
  - “залайкать” карточку (PUT)
  - удалить лайк карточки (DELETE)*/
  
  
  // если ошибка, отклоняем промис
  //return Promise.reject(`Ошибка: ${res.status}`);