import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


// •  <Login /> - компонент для авторизации пользователя.
//  Из себя представляет форму где пользователь 
//  вводит данные (почту и пароль) 
//  и передает их в функцию отправки на сервер.
//   Сама функция должна быть описана выше, на уровне app.js .


const Login = () => {
  // const [formValue, setFormValue] = useState({
  //   username: '',
  //   password: ''
  // })
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const {name, value} = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formValue.username || !formValue.password){
  //     return;
  //   }
  //   auth.authorize(formValue.username, formValue.password)
  //     .then((data) => {
  //       if (data.jwt){
  //         setFormValue({username: '', password: ''});
  //         handleLogin();
  //         navigate('/diary', {replace: true});
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  return (
      <section className='login'>
        <p className="login__text">
          Вход
        </p>
        <form /*onSubmit={handleSubmit}*/ className="login__form">
          <input
            id='input-email'
            className='login__input login__input_type_email'
            type='email'
            placeholder='Email'
            name='email'
            //value={}
            //onChange={handleChange}
            required
          />
          <input
            id='input-password'
            className='login__input login__input_type_password'
            type='password'
            placeholder='Пароль'
            name='password'
            //value={}
            //onChange={handleChange}
            required
          />
          <button className="login__button" type="submit">Войти</button>
        </form>
      </section>
  )
}

export default Login;