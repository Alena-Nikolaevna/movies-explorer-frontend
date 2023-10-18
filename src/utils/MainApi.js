class MainApi {
    constructor(setting) {
      this._address = setting.baseUrl;
    }
  
    // ф-ция проверки результата
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }
    
    // загружаем информацию о пользователе с сервера
    getUserInfo(token) {
      return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }
  
    // получить список всех карточек в виде массива (GET)
    // загружаем карточки с сервера
    getInitialMovies(token) {
      return fetch(`${this._address}/movies`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }
  
    // отправляем/сохраняем данные пользователя на сервер 
    // заменяем данные пользователя
    patchUserInfo(data, token) {
      return fetch(`${this._address}/users/me/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        })
      }).then(this._checkResponse);
    }


        /*createNewMovie(data) {
      return fetch(`${this._address}/movies`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      }).then(this._checkResponse);
    }*/
  
    // добавление новой карточки 
    // ???????????????
    createNewMovie(data, token) {
      return fetch(`${this._address}/movies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            // image: data.image,
            image: `https://api.nomoreparties.co${data.image.url}`,
            trailerLink: data.trailerLink,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
            // thumbnail: data.thumbnail,
            thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
            movieId: data.id,
        })
      }).then(this._checkResponse);
    }

    // удаление карточки
    deleteMovie(movieId, token) {
      return fetch(`${this._address}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }
  
}
  
 const mainApi = new MainApi({
    baseUrl: "https://api.movies-ank.nomoreparties.co",
  });
  
  export default mainApi;
  
  /*- получить список всех карточек в виде массива (GET) +
  - добавить карточку (POST)
  - удалить карточку (DELETE)
  - получить данные пользователя (GET) +-
  - заменить данные пользователя (PATCH) +
  - удалить лайк карточки (DELETE)*/
  
  // если ошибка, отклоняем промис
  //return Promise.reject(`Ошибка: ${res.status}`);