import React from 'react';

const InfoTooltip = ({isOpen, onClose, title, image}) => {
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
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}/>
        <img className='popup__img' src={image}/>
        <p className='popup__text'>{title}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;