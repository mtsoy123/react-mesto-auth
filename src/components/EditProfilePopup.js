import PopupWithForm from './PopupWithForm';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit-profile"
      onClose={onClose}
      buttonLabel="Сохранить"
      onSubmit={handleSubmit}
    >
      <label htmlFor="pop-up__name-input" className="pop-up__label">
        <input id="pop-up__name-input" type="text" name="edit-name" minLength="2" maxLength="40" required
               className="pop-up__input pop-up__input_type_name" placeholder="Имя, фамилия"
               onChange={handleNameChange} value={name}/>
        <span className="pop-up__name-input-error pop-up__error-message"></span>
      </label>
      <label htmlFor="pop-up__job-input" className="pop-up__label">
        <input id="pop-up__job-input" type="text" name="edit-job" minLength="2" maxLength="200" required
               className="pop-up__input pop-up__input_type_job" placeholder="О себе"
               onChange={handleDescriptionChange} value={description}/>
        <span className="pop-up__job-input-error pop-up__error-message"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup