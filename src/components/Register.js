import {Link, useHistory} from 'react-router-dom';
import {register} from './Auth';
import {useEffect, useState} from 'react';

function Register({handleRegister}) {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
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

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password)
    .then((res) => {
      if (res) {
        handleRegister('success')
        history.push('/sign-in');
      } else {
        handleRegister('error')
      }
    })
    .catch(err => console.log(err))
    ;
  }

  return (
    <>
      <div className="register register__container">
        <h2 className="register__title">Регистрация</h2>
        <form noValidate name="Регистрация" onSubmit={handleSubmit}>
          <label htmlFor="register__email-input" className="register__label">
            <input id="register__email-input" type="text" name="email" placeholder="Email"
                   className="register__input register__input_type_email" minLength="2" maxLength="30" required
                   onChange={handleEmailChange}/>
            <span className="pop-up__place-input-error pop-up__error-message"></span>
          </label>
          <label htmlFor="register__password-input" className="register__label">
            <input id="register__password-input" type="password" name="add-link" placeholder="Пароль"
                   className="register__input register__input_type_link" required onChange={handlePasswordChange}/>
            <span className="pop-up__link-input-error pop-up__error-message"></span>
          </label>
          <button type="submit" aria-label="Зарегистрироваться" className="register__button">Зарегистрироваться</button>
        </form>
        <p className="register__description">Уже зарегистрированы? <Link to="/sign-in"
                                                                         className="register__description register__link">Войти</Link>
        </p>
      </div>
    </>
  );
}

export default Register;