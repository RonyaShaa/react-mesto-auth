import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';

function Header({email}) {
 
    return (
      <header className="header">
        <div className="header__logo"></div>
        <Routes>
          <Route
            path='signin'
            element={<Link to='/signup' className='header__link'>Регистрация</Link>}
          />
          <Route
            path='signup'
            element={<Link to='/signin' className='header__link'>Войти</Link>}
          />
          <Route
            path='/'
            element={
              <>
                <p className='header__user-email'>{email}</p>
                <Link to='/signup' className='header__link'>Выйти</Link>
              </>
            }
          />
        </Routes>
      </header>
    )
}

export default Header;