import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    setValues({ name: '', link: '' })
  }, [isOpen]);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit (e){
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    })
  }
  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-mesto"
        type="text"
        className="popup__input-text popup__input-text_type_mesto"
        placeholder="Название"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        // minlength="2"
        // maxlength="30"
        required
      />
      <span id="input-mesto-error" className="popup__error"></span>
      <input
        id="input-link"
        type="url"
        className="popup__input-text popup__input-text_type_link"
        placeholder="Ссылка на картинку"
        name="link"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span id="input-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;