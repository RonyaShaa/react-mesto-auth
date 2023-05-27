import React from 'react';
import editButton from '../images/Edit__Button.svg';
import pluse from '../images/pluse.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick, onCardLike, onCardDelete, cards}) {

  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__button-avatar" onClick={onEditAvatarClick}>
          <img
            className="profile__photo"
            src={currentUser.avatar}
            alt="Фотография владельца профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser.name}
          </h1>
          <button
            className="profile__button"
            type="button"
            onClick={onEditProfileClick}
          >
            <img
              src={editButton}
              alt="Кнопка 'Редактировать профиль'"
              className="profile__edit-button"
            />
          </button>
          <p className="profile__interests">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__add-photo"
          type="button"
          onClick={onAddPlaceClick}
        >
          <img
            src={pluse}
            alt="Кнопка 'Добавить фото в профиль'"
            className="profile__button-pluse"
          />
        </button>
      </section>
      <section className="cards">
        {
          cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })
        }
      </section>
    </main>
  )
}


export default Main;