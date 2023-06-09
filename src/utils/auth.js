export const BASE_URL= 'https://auth.nomoreparties.co';

function checkResponse(res){
  if(res.ok) {
    //возвращаем ответ сервера
    return res.json(); 
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};


// • функция register - принимает почту и пароль, 
// отправляет запрос регистрации на /signup

export const register = (email,password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,password})
  })
    .then(checkResponse);
};

// • функция login - принимает почту и пароль, 
// отправляет запрос авторизации на /signin . 
// В ответ сервер вернет jwt, который нужно 
// сохранить в localStorage


export const login = (email, password) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,password})
  })
  .then(checkResponse);
};

// • функция checkToken - принимает jwt, 
// отправляет запрос на /users/me 
// и возвращает данные пользователя

export const checkToken = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(checkResponse);
}

