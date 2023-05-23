import React from 'react';


// • <InfoTooltip /> - просто старый добрый попап, 
// который показывает сообщение об успешной регистрации, 
// или наоборот - о произошедшей при регистрации ошибке. 
// Управлять поведением этого попапа можно 
// через state’ы в компоненте App.js
// Так же нужно доработать компонент <Header />. 
// Теперь в шапке в зависимости от страницы, на которой мы находимся, 
// будут так же отображаться разные 
// ссылки: “Регистрация“, “Войти“, “[email пользователя] Выйти“.
//  Для отображения соответствующей ссылке на странице 
//  можно использовать <Route />

const InfoTooltip = () => {
  // return (
  //   <div className='popup popup_type_success popup_opened'>
  //     <div className="popup__container">
  //       <button className="popup__close" type="button" />
  //       <div className='popup__img-success ' />
  //       <p className='popup__text'>Вы успешно зарегистрировались!</p>
  //     </div>
  //   </div>
  // )
  return (
    <div className='popup popup_type_success popup_opened'>
      <div className="popup__container">
        <button className="popup__close" type="button" />
        <div className='popup__img-fail' />
        <p className='popup__text'>Что-то пошло не так!
Попробуйте ещё раз.</p>
      </div>
    </div>
  )
}

export default InfoTooltip;