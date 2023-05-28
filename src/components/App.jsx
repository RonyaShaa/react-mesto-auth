import React from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import {ProtectedRoute} from './ProtectedRoute'
import * as auth from '../utils/auth';
import fail from '../images/крестик.svg'
import success from '../images/галочка.svg'


function App() {
  // добавим в стейт переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [infoTooltipTitle, setInfoTooltipTitle] = React.useState('');
  const [toolTipImage, setTooltipImage] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        //получаем объект с данными пользователя(name, about, avatar)
        //получим массив карточек с сервера
        setCurrentUser(userData)
        setCards(cardData);
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }, []);//при перерендере будет проверяться массив зависимостей

  React.useEffect(() => {
    tokenCheck()
  },[]);

  function handleLogin(email,password){
    auth.login(email, password)
    .then((res) => {
        // сохраняем jwt
        localStorage.setItem('jwt',res.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', {replace: true});
    })
    .catch(err => console.log(err));
  }

  function handleRegister(email,password){
    auth.register(email, password)
    .then(() => {
      setIsInfoTooltipPopupOpen(true);
      setInfoTooltipTitle('Вы успешно зарегистрировались!');
      setTooltipImage(success);
      navigate('/signin');
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipPopupOpen(true);
      setInfoTooltipTitle('Что-то пошло не так! Попробуйте еще раз.');
      setTooltipImage(fail);
    })
  }

  //сохраним авторизованного пользователя
  function tokenCheck(){
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if(jwt){
      auth.checkToken(jwt)
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        setUserEmail(res.data.email)
        // вызовем navigate и передадим путь
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
    }
  }

  function handleSignout(){
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id,!isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards(cards => cards.filter((c) => c._id !== card._id))
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }

  function handleUpdateUser(userData){
    api.setUserInfo(userData)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }

  function handleUpdateAvatar(userData){
    api.editAvatar(userData)
      .then((res) =>{
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }

  function handleAddPlaceSubmit(cardData){
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={userEmail} handleSignout={handleSignout}/>
          <Routes>
            <Route path='/' 
              element={
                <ProtectedRoute 
                  element={Main} 
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}      
                  onAddPlaceClick={handleAddPlaceClick}  
                  onCardClick={handleCardClick}   
                  onCardLike={handleCardLike}  
                  onCardDelete={handleCardDelete}  
                  cards={cards}
                  loggedIn={loggedIn}
                />
              } 
            />
            <Route path='/' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/signin' replace />} /> 
            <Route path='signup' element={<Register onRegister={handleRegister}/>} />
            <Route path='signin' element={<Login onLogin={handleLogin} />} />
          </Routes>  
          <Footer />
          {/* попап Регистрации */}
          <InfoTooltip 
            isOpen={isInfoTooltipPopupOpen} 
            onClose={closeAllPopups} 
            title={infoTooltipTitle}
            image={toolTipImage}
          />
          {/* попап Редактировать профиль */}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          {/* попап Развернуть карточку */}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
          {/* попап Удалить карточку */}
          <PopupWithForm
            title='Вы уверены?'
            name='delete-card'
          >
            <button className="popup__button-yes" type="submit">Да</button>
          </PopupWithForm>
          {/* попап Обновить фото профиля */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          {/* попап Добавить карточку */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


