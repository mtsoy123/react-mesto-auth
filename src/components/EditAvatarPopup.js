import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatar = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="edit-avatar"
      onClose={onClose}
      buttonLabel="Сохранить"
      onSubmit={handleSubmit}
    >
      <label htmlFor="pop-up__name-input" className="pop-up__label">
        <input ref={avatar} id="pop-up__avatar-input" type="url" name="edit-avatar" required
               className="pop-up__input pop-up__input_type_avatar" placeholder="Ссылка на аватар"/>
        <span className="pop-up__avatar-input-error pop-up__error-message"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup