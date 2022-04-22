import React from 'react';
import PopupWithForm from './PopupWithForm';
import {api} from '../utils/Api';
import ImagePopup from './ImagePopup';
import Card from './Card';


function Main ({onEditProfile, isEditAvatarPopupOpen, onEditAvatar, isEditProfilePopupOpen, onAddPlace, isAddPlacePopupOpen, onClose, selectedCard, onCard}) {

  const [userName, setUserName] = React.useState("")
  const [userDescription, setUserDescription] = React.useState("")
  const [userAvatar, setUserAvatar] = React.useState("")

  React.useEffect(() => {
    api.getProfile()
    .then(res => {
      setUserName(res.name)
      setUserAvatar(res.avatar)
      setUserDescription(res.about)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const [cards, setInitialCards] = React.useState([])
  React.useEffect(() => {
    api.getInitialCards()
    .then(res => {
      setInitialCards(res)
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" aria-label="Редактировать аватар" className="profile__button-avatar" onClick={onEditAvatar}>
            <img src={userAvatar} style={{backgroundImage:`url(${userAvatar})`}} alt="Аватар" className="profile__avatar"/>
          </button>
          <div className="profile__info-container">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
            <button type="button" aria-label="Редактировать профиль" className="profile__button-edit" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__button-add" onClick={onAddPlace}></button>
      </section>

      <section className="grid">
        {cards.map((item) => (
          <Card onCardClick={onCard} cardProps={item} card={
            <div className="grid__element" key={item._id}>
              <img src={item.link} alt={item.name} className="grid__element-photo"/>
              <div className="grid__container">
                <h2 className="grid__element-header">{item.name}</h2>
                <div className="grid__like-container">
                  <button type="button" aria-label="Мне нравится" className="grid__like-button"></button>
                  <p className="grid__like-count">{item.likes.length}</p>
                </div>
              </div>
              <button type="button" aria-label="Удалить" className="grid__delete-element"></button>
            </div>
          }/>
        ))}
      </section>

      <ImagePopup
        isOpen={selectedCard.isOpen}
        selectedCard={selectedCard}
        onClose={onClose}
      >
      </ImagePopup>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        name="edit-profile"
        onClose={onClose}
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
        <button type="submit" aria-label="Сохранить" className="pop-up__button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title="Обновить аватар"
        name="edit-avatar"
        onClose={onClose}
      >
        <label htmlFor="pop-up__name-input" className="pop-up__label">
          <input id="pop-up__avatar-input" type="url" name="edit-avatar" required
                 className="pop-up__input pop-up__input_type_avatar" placeholder="Ссылка на аватар"/>
          <span className="pop-up__avatar-input-error pop-up__error-message"></span>
        </label>
        <button type="submit" aria-label="Сохранить" className="pop-up__button">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        title="Новое место"
        name="add-place"
        onClose={onClose}
      >
        <label htmlFor="pop-up__place-input" className="pop-up__label">
          <input id="pop-up__place-input" type="text" name="add-place" placeholder="Название"
                 className="pop-up__input pop-up__input_type_place" minLength="2" maxLength="30" required />
          <span className="pop-up__place-input-error pop-up__error-message"></span>
        </label>
        <label htmlFor="pop-up__link-input" className="pop-up__label">
          <input id="pop-up__link-input" type="url" name="add-link" placeholder="Ссылка на картинку"
                 className="pop-up__input pop-up__input_type_link" required />
          <span className="pop-up__link-input-error pop-up__error-message"></span>
        </label>
        <button type="submit" aria-label="Создать" className="pop-up__button">Создать</button>
      </PopupWithForm>

    </main>
  )
}

export default Main;