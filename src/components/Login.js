import React, {useEffect, useState} from 'react';
import {authorize} from './Auth';
import {useHistory} from 'react-router-dom';

function Login({handleLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return
    }
    authorize(email, password)
    .then((data) => {
      if (data.token) {
        setEmail('');
        setPassword('');
        handleLogin(e);
      }
    })
    .then(res => history.push('/'))
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="login login__container">
        <h2 className="login__title">Вход</h2>
        <form noValidate name="login" onSubmit={handleAddPlaceSubmit}>
          <label htmlFor="login__email-input" className="login__label">
            <input id="login__email-input" type="text" name="email" placeholder="Email"
                   className="login__input login__input_type_email" minLength="2" maxLength="30" required
                   onChange={handleEmailChange}/>
            <span className="pop-up__place-input-error pop-up__error-message"></span>
          </label>
          <label htmlFor="login__password-input" className="login__label">
            <input id="login__password-input" type="password" name="add-link" placeholder="Пароль"
                   className="login__input login__input_type_link" required onChange={handlePasswordChange}/>
            <span className="pop-up__link-input-error pop-up__error-message"></span>
          </label>
          <button type="submit" aria-label="Войти" className="login__button">Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;