import React from 'react';

function ImagePopup({onClose, card, isOpen}) {

  React.useEffect(() => {
    //ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if(!isOpen) return;
    // объявляем внутри useEffect функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEsc = (e) => {
      if(e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEsc)
    //обязательно удаляем обработчик
    return () => document.removeEventListener('keydown', closeByEsc)
    // обязательно следим за isOpen, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose])

  //создаем обработчик оверлея
  const handleOverlay = (e) => {
    if(e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
      <div className={`popup popup_type_expand-card ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlay}>
        <div className="popup__container-fullscreen">
          <button className="popup__close popup__close_expand_card" type="button" onClick={onClose}></button>
          <img src={card.link} alt={card.name} className="popup__photo" />
          <h2 className="popup__photo-name">{card.name}</h2>
        </div>
      </div>
  )
}
export default ImagePopup;
