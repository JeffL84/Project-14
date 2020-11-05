class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  addCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.url,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }

  changeLikeCardStatus(cardID, like) {
    return (like
      ? fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
          headers: this._headers,
          method: "PUT",
        })
      : fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
          headers: this._headers,
          method: "DELETE",
        })
    ).then((res) =>
      res.ok ? res.json() : Promise.reject("Error" + res.statusText)
    );
  }

  setUserInfo([name, job, avatar]) {
    //name and about might be different in mine
    return fetch(`${this._baseUrl}/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
        avatar: avatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject("Error! " + res.statusText)
    );
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-3",
  headers: {
    authorization: "69eeb443-3163-42be-a4f6-357544c2977b",
    "Content-Type": "application/json",
  },
});

export { api };
