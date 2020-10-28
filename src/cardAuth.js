export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err)=>console.log(err)); //possibly change this later related to Register.js
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    console.log('authorize', response);
    return response.json();
  })
  .then((data) => {
    if(data.user) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
    else {
      return;
    }
  })
  .catch((err)=>console.log("authorize err", err)); //possibly change this later related to Login.js
}

//~3:30 in live coding if something is not working...
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` 
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      return data
    })
  .catch((err)=>console.log(err)); //possibly change this later
}
