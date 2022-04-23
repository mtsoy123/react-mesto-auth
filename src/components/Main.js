import React from 'react';
import {api} from '../utils/Api';
import ImagePopup from './ImagePopup';
import Card from './Card';

function Main({
                onEditProfile,
                onEditAvatar,
                onAddPlace,
                onClose,
                selectedCard,
                onCard
              }) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setInitialCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userProfile, cards]) => {
      setUserName(userProfile.name)
      setUserAvatar(userProfile.avatar)
      setUserDescription(userProfile.about)

      setInitialCards(cards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" aria-label="Редактировать аватар" className="profile__button-avatar"
                  onClick={onEditAvatar}>
            <img src={userAvatar} style={{backgroundImage: `url(${userAvatar})`}} alt="Аватар"
                 className="profile__avatar"/>
          </button>
          <div className="profile__info-container">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
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