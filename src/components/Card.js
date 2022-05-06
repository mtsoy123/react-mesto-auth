import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({onCardClick, cardProps}) {

  function handleClick() {
    onCardClick(cardProps);
  }

  //console.log(cardProps);
  const currentUser = React.useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardProps.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'grid__delete-element' : 'grid__delete-element_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = cardProps.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked && 'grid__like-button_active'}`
  );

  return (
    <div onClick={handleClick} className="grid__element">
      <img src={cardProps.link} alt={cardProps.name} className="grid__element-photo"/>
      <div className="grid__container">
        <h2 className="grid__element-header">{cardProps.name}</h2>
        <div className="grid__like-container">
          <button type="button" aria-label="Мне нравится"
                  className={`${cardLikeButtonClassName} grid__like-button`}></button>
          <p className="grid__like-count">{cardProps.likes.length}</p>
        </div>
      </div>
      <button type="button" aria-label="Удалить"
              className={`${cardDeleteButtonClassName}`}></button>
    </div>
  )

}

export default Card