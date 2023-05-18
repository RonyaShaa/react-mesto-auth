class Api {
  constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    
  }

  _checkResponse = (res) => {
    if(res.ok) {
      //возвращаем ответ сервера
      return res.json(); 
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  //загрузка информации о пользователе с сервера
   getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //редактирование данных профиля
  setUserInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then(this._checkResponse);
  }

  //добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body:  JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse);
  }

  //удаление карточки
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  changeLikeCardStatus(cardId, likeStatus) {
    if(likeStatus){
      //поставить лайк
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse);
    } else {
      //удалить лайк
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  }
 
  //обновление аватара пользователя
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse);
  }
}

//экземпляр апи
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    'content-type': 'application/json',
    authorization: '42690f73-759c-4798-9db6-9b61cef90de2',
  }
});
