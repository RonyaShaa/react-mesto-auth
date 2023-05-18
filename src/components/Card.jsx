import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card);
  } 

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className="card">
      {/* в разметке используем переменную для условного рендеринга */}
      {isOwn && <button className='card__delete' onClick={handleDeleteClick} />} 
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <div className="card__place">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          >
          </button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  )
}

export default Card;