import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = React.useState({});

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about})
  }, [currentUser, isOpen]);
  
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      [e.target.about]: e.target.value,
    })
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        type="text"
        className="popup__input-text popup__input-text_type_name"
        placeholder="Введите имя"
        name="name"
        // minlength="2"
        // maxlength="40"
        value={values.name || ""}
        onChange={handleChange}
        required
      /> 
      <span id="input-name-error" className="popup__error"></span>
      <input
        id="input-interests"
        type="text"
        className="popup__input-text popup__input-text_type_interests"
        placeholder="Введите интересы"
        name="about"
        // minlength="2"
        // maxlength="200"
        value={values.about || ""}
        onChange={handleChange}
        required
      />
      <span id="input-interests-error" className="popup__error"></span>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
