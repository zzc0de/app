import React from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
import useLogin from '../../hooks/useLogin';
import validateLogin from '../validate/validateLogin.js';

export default function Login() {

  const {loginHandler, login, errors} = useLogin(validateLogin);


  return (
    <div className="login">
        <form className="form" action="" onSubmit={login}>
        <div className="title">Авторизация</div>
            <label for="email">Почта</label>
            <input 
            type="text" 
            id="email" 
            name='email'
            placeholder='Укажите свою почту'
            onChange={loginHandler}
            />
             <div className="form-error">
                {errors.email && <p>{errors.email}</p>}
            </div>
            <label for="password">Пароль</label>
            <input 
            type="password" 
            id="password"
            name='password'
            placeholder='Ваш пароль'
            onChange={loginHandler}
            />
             <div className="form-error">
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button className="login-btn" type='submit'>Войти</button>
            <span>Нет аккаунта? <Link to="#">Зарегистрироваться</Link> </span>
        </form>
    </div>
  )
};
