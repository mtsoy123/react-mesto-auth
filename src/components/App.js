import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import {api} from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SignIn from './sign-in';
import SignUp from './sign-up';

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [selectedCard, setViewPlacePopup] = useState({})
  let [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userProfile, cards]) => {
      setCurrentUser(currentUser = userProfile)
      setCards(cards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen((isAddPlacePopupOpen) => !isAddPlacePopupOpen)

  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen((isEditProfilePopupOpen) => !isEditProfilePopupOpen)
  }

  function handleUpdateUser(userInfo) {
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

  function handleCardClick(card) {
    setViewPlacePopup((selectedCard = {
        isOpen: true,
        name: card.name,
        link: card.link,
      })
    )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => setCards(oldCards => oldCards.filter(newCard => newCard._id !== card._id)))
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlace(place) {
    api.addCard(place)
    .then(newPlace => {
      setCards([newPlace, ...cards]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function closeAllPopups(evt) {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__button-close') || (evt.target.type === 'submit')) {
      setIsEditProfilePopupOpen()
      setIsEditAvatarPopupOpen()
      setIsAddPlacePopupOpen()
      setViewPlacePopup({})
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
        onCard={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
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

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <Footer/>

      <SignIn/>
      <SignUp/>
    </CurrentUserContext.Provider>
  );
}

export default App;
