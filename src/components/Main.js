import React from 'react';
import ImagePopup from './ImagePopup';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import {api} from '../utils/Api';

function Main({
                onEditProfile,
                onEditAvatar,
                onAddPlace,
                onClose,
                selectedCard,
                onCard,
              }) {

  const currentUser = React.useContext(CurrentUserContext);
  const {avatar, name, about} = currentUser;

  const cards = React.useContext(CardsContext).cards;
  const setCards = React.useContext(CardsContext).setCards;

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
// todo add catch
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => setCards(oldCards => oldCards.filter(newCard => newCard._id != card._id)))
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" aria-label="Редактировать аватар" className="profile__button-avatar"
                  onClick={onEditAvatar}>
            <img src={avatar} style={{backgroundImage: `url(${avatar})`}} alt="Аватар"
                 className="profile__avatar"/>
          </button>
          <div className="profile__info-container">
            <h1 className="profile__name">{name}</h1>
            <p className="profile__job">{about}</p>
            <button type="button" aria-label="Редактировать профиль" className="profile__button-edit"
                    onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__button-add" onClick={onAddPlace}></button>
      </section>

      <section className="grid">
        {cards.map((item) => (
          <Card
            onCardClick={onCard}
            cardProps={item}
            key={item._id}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>

      <ImagePopup
        isOpen={selectedCard.isOpen}
        selectedCard={selectedCard}
        onClose={onClose}
      >
      </ImagePopup>


    </main>
  )
}

export default Main;