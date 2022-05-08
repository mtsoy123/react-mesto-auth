import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import PopupWithForm from './PopupWithForm';
import {api} from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  let [selectedCard, setViewPlacePopup] = React.useState({})
  let [currentUser, setCurrentUser] = React.useState({});
  let [cards, setCards] = React.useState([]);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen((isAddPlacePopupOpen) => !isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen((isEditProfilePopupOpen) => !isEditProfilePopupOpen)
  }

  function handleUpdateUser(userInfo) { //принимает объект с настройками
    api.editProfile(userInfo)
    .then(res => {
      setCurrentUser(currentUser = {
        name: res.name,
        about: res.about,
        avatar: res.avatar
      })
    })
    .then(res => closeAllPopups)
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
    .then(res => {
      setCurrentUser(currentUser = {
        name: res.name,
        about: res.about,
        avatar: res.avatar
      })
    })
    .then(res => closeAllPopups)
    .catch((err) => {
      console.log(err);
    });
  }


  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userProfile, cards]) => {
      setCurrentUser(currentUser = userProfile)
      setCards(cards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleCardClick(card) {
    setViewPlacePopup((selectedCard = {
        isOpen: true,
        name: card.name,
        link: card.link,
      })
    )
  }

  function closeAllPopups(evt) {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__button-close') || (evt.target.type === 'submit')) {
      setIsEditProfilePopupOpen()
      setIsEditAvatarPopupOpen()
      setIsAddPlacePopupOpen()
      setViewPlacePopup({})
    }
  }


  /*React.useEffect(() => {
    console.log(currentUser)
  }, [currentUser])*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={{
        cards,
        setCards
      }}>
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
          onCard={handleCardClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          title="Новое место"
          name="add-place"
          onClose={closeAllPopups}
          buttonLabel="Создать"
        >
          <label htmlFor="pop-up__place-input" className="pop-up__label">
            <input id="pop-up__place-input" type="text" name="add-place" placeholder="Название"
                   className="pop-up__input pop-up__input_type_place" minLength="2" maxLength="30" required/>
            <span className="pop-up__place-input-error pop-up__error-message"></span>
          </label>
          <label htmlFor="pop-up__link-input" className="pop-up__label">
            <input id="pop-up__link-input" type="url" name="add-link" placeholder="Ссылка на картинку"
                   className="pop-up__input pop-up__input_type_link" required/>
            <span className="pop-up__link-input-error pop-up__error-message"></span>
          </label>
        </PopupWithForm>
        <Footer/>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
