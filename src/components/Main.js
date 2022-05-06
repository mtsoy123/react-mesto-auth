import React from 'react';
import ImagePopup from './ImagePopup';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';

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

  const cards = React.useContext(CardsContext)

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
            key={item._id}/>
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