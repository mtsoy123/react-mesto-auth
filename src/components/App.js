import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';

function App() {

  const [isAddPlacePopupOpen, openAddPlacePopup] = React.useState(false);
  function handleAddPlaceClick() {
    openAddPlacePopup((isAddPlacePopupOpen) => !isAddPlacePopupOpen)
  }


  const [isEditAvatarPopupOpen, openEditAvatarPopup] = React.useState(false);
  function handleEditAvatarClick() {
    openEditAvatarPopup((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen)
  }


  const [isEditProfilePopupOpen, openEditProfilePopup] = React.useState(false);
  function handleEditProfileClick() {
    openEditProfilePopup((isEditProfilePopupOpen) => !isEditProfilePopupOpen)
  }

  let [selectedCard, openViewPlacePopup] = React.useState({})
  function handleCardClick(card) {
    openViewPlacePopup((selectedCard = {
      isOpen: true,
      name: card.name,
      link: card.link,
      })
    )
  }

  function closeAllPopups(evt) {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__button-close')) {
      openEditProfilePopup()
      openEditAvatarPopup()
      openAddPlacePopup()
      openViewPlacePopup({})
    }
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}

        onEditAvatar={handleEditAvatarClick}
        isEditProfilePopupOpen={isEditProfilePopupOpen}

        onAddPlace={handleAddPlaceClick}
        isAddPlacePopupOpen={isAddPlacePopupOpen}

        onClose={closeAllPopups}

        selectedCard={selectedCard}
        onCard={handleCardClick}
      />
      <Footer />
  </>
);
}

export default App;
