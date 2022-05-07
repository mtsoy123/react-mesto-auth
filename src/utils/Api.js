class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (url, options = {}) => {
    return fetch(url, options)
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  getProfile() {
    return this._checkResponse(`${this._baseUrl}/users/me`, {headers: this._headers})
  };

  getInitialCards() {
    return this._checkResponse(`${this._baseUrl}/cards`, {headers: this._headers})
  }

  editProfile(userInfo) {
    return this._checkResponse(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
  }

  addCard(item) {
    return this._checkResponse(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item)
    })
  }

  editAvatar(link) {
    return this._checkResponse(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link)
    })
  }

  deleteCard(id) {
    return this._checkResponse(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeLikeCardStatus(id, isLiked) {
    /*isLiked ? this._deleteLike(id) : this._addLike(id)*/
    /*if (isLiked) {
      this._deleteLike(id)
    } else (!isLiked) {
      this._addLike(id)
    }*/

    // todo check if !isLiked or isLiked
    // todo delete method deleteLike && addLike
    if (!isLiked) {
      console.log(321)
      return this._checkResponse(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
    } else {
      console.log(123)
      return this._checkResponse(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
    }
  }

  _deleteLike(id) {
    console.log(321)
    return this._checkResponse(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  _addLike(id) {
    console.log(123)
    return this._checkResponse(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'f6872bd5-5bdc-483a-908f-75dc86dba7db',
    'Content-Type': 'application/json'
  }
});