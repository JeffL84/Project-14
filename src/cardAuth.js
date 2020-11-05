export const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log("register", response);
      return response.json();
    })
    .then((res) => {
      // console.log('register part 2', res);
      return res;
    })
    .catch((err) => console.log(err)); //possibly change this later related to Register.js
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      //console.log('authorize', response);
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        //console.log('authorize part 2', data);
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => console.log("authorize err", err)); //possibly change this later related to Login.js
};

//~3:30 in live coding if something is not working...
export const getContent = (token) => {
  return fetch(`${BASE_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err)); //possibly change this later
};
