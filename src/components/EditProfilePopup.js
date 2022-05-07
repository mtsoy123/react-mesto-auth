import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose}) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit-profile"
      onClose={onClose}
      buttonLabel="Сохранить"
    >
      <label htmlFor="pop-up__name-input" className="pop-up__label">
        <input id="pop-up__name-input" type="text" name="edit-name" minLength="2" maxLength="40" required
               className="pop-up__input pop-up__input_type_name" placeholder="Имя, фамилия"/>
        <span className="pop-up__name-input-error pop-up__error-message"></span>
      </label>
      <label htmlFor="pop-up__job-input" className="pop-up__label">
        <input id="pop-up__job-input" type="text" name="edit-job" minLength="2" maxLength="200" required
               className="pop-up__input pop-up__input_type_job" placeholder="О себе"/>
        <span className="pop-up__job-input-error pop-up__error-message"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup