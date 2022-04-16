  class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: this._headers
          })
          .then(this._checkAnswer)
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
        })
        .then(this._checkAnswer)
    }

    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
      })})
      .then(this._checkAnswer)
    }

    addNewCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkAnswer)
    }

    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkAnswer)
    }

    dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkAnswer)
    }

    changeLike(cardId, isLiked) {
      if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId)
    }}

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkAnswer)
    }

    editAvatar(url) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: url
        })
      })
      .then(this._checkAnswer)
    }

    _checkAnswer(res) {
      if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    updateHeaders() {
      this._headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }
  }

  const api = new Api({
    baseUrl: 'https://api.mesto.timelas.nomoredomains.work',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  });

  export default api;