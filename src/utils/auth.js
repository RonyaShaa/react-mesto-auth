export const BASE_URL= 'https://auth.nomoreparties.co/';
// • функция register - принимает почту и пароль, 
// отправляет запрос регистрации на /signup

export const register = (email,password) => {
  return fetch (`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,password})
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  };

// • функция login - принимает почту и пароль, 
// отправляет запрос авторизации на /signin . 
// В ответ сервер вернет jwt, который нужно 
// сохранить в localStorage


export const login = (id, password) => {
  return fetch (`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      password,
    })
    .then((response) => {
      return response.json();
    })
    // .then((data) => {
    //   if(data.user) {
    //     localStorage.setItem('jwt', data.jwt);
    //     return data;
    //   } else {
    //     return;
    //   }
    // })
  })
}

// • функция checkToken - принимает jwt, 
// отправляет запрос на /users/me 
// и возвращает данные пользователя

export const checkToken = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Autorization': `Bearer ${token}`
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
}

