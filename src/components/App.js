import '../index.css';
import Header from './Header';
import Main from './Main';
import {useEffect, useState} from 'react';
import {api} from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import {getContent} from './Auth';

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [selectedCard, setViewPlacePopup] = useState({})
  let [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [status, setStatus] = useState();
  const history = useHistory();

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

  useEffect(() => checkToken(), [])

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
      setIsInfoTooltipOpened()
      setViewPlacePopup({})
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    setLoggedIn(true)
  }

  function checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
        }
      })
      .then((res) => {
        history.push('/');
      })
      .catch(err => console.log(err))
    }
  }

  function handleRegister(status) {
    if (status === 'success') {
      setStatus('success');
    } else {
      setStatus('error');
    }
    setIsInfoTooltipOpened(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        userData={userEmail}
        onSignOut={setLoggedIn}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}

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

        <Route path="/sign-in">
          <Login
            handleLogin={handleLogin}
          />
        </Route>

        <Route path="/sign-up">
          <Register
            handleRegister={handleRegister}
          />
        </Route>

        <Route>
          {loggedIn ? (<Redirect to="/"/>) : (<Redirect to="/sign-in"/>)}
        </Route>

      </Switch>

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

      <InfoTooltip
        isOpen={isInfoTooltipOpened}
        onClose={closeAllPopups}
        status={status}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
