import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';

// • <Register /> - компонент практически полностью 
// дублирует логику компонента Login, 
// но при сабмите форма вызывает другую функцию. 
// Она отправляет данные через функцию регистрации 
// и получает ответ что все ок, или не совсем

const Register = () => {

  // стейт формы
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

// хук навигации
const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const {email, password} = formValue;

    auth.register(email, password)
    .then(() => {
    // вызовем navigate и передадим путь
      navigate('/signin');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <section className='register'>
      <p className="register__text">
      Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id='input-email'
          className='register__input register__input_type_email'
          type='email'
          placeholder='Email'
          name='email'
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          id='input-password'
          className='register__input register__input_type_password'
          type='password'
          placeholder='Пароль'
          name='password'
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button className="register__button" type="submit">Зарегистрироваться</button>
        <a href='#' className='register__link'>Уже зарегистрированы? Войти</a>
      </form>
    </section>
)
}

export default Register;