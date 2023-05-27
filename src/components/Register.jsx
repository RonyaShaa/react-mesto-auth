import React from 'react';
import {Link} from 'react-router-dom';

const Register = ({onRegister}) => {

  // стейт формы
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

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
    onRegister(email,password);
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
        <Link to='/signin' className='register__link'>Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  )
}

export default Register;