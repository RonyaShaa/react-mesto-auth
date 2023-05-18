import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputElement = React.useRef();


  React.useEffect(() => {
    inputElement.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputElement.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='update-avatar'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputElement}
        id="input-update-avatar"
        type="url"
        className="popup__input-text popup__input-text_type_update-avatar"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span id="input-update-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;