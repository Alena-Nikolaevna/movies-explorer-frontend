const moviesApi = {

    getMoviesApi() {
        return fetch("https://api.nomoreparties.co/beatfilm-movies", {
           method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            });
    }
};

export default moviesApi;

/*class MoviesApi {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _checkResponse(res) { return res.ok ? res.json() : Promise.reject }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkResponse)
    }

    getMoviesApi() {
        return this._request('/')
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;*/