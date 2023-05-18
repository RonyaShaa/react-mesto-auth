import React from 'react';

function PopupWithForm({title, name ,buttonText, children, isOpen , onClose, onSubmit}) {
  
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
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlay}>  
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={onClose}/>
          <h2 className="popup__name">{title}</h2>
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            {children}
            <button className="popup__button" type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
  )
}
export default PopupWithForm;