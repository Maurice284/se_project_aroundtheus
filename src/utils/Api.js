class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  // Delete function
  //   - DELETE method
  //   - no body, same headers
  //   - accept the id as a parameter
  //   - add the id to the of the url

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // addLikes(cardID, likes) {
  //   return fetch(`${this._baseUrl}/cards/cardId/${likes}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       likes: likes,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // if the server returns an error, reject the promise
  //       return Promise.reject(`Error: ${res.status}`);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  // // // removeLikes(cardID, likes) {
  // // //   return fetch(`${this._baseUrl}/cards/cardId/${likes}`, {
  // // //     method: "DELETE",
  // // //     headers: this._headers,
  // // //     body: JSON.stringify({
  // // //       likes: likes,
  // // //     }),
  // //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // if the server returns an error, reject the promise
  //       return Promise.reject(`Error: ${res.status}`);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  updateProfilePic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export default Api;
