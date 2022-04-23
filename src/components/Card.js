function Card({onCardClick, cardProps}) {

  function handleClick() {
    onCardClick(cardProps);
  }

  return (
    <div onClick={handleClick} className="grid__element">
      <img src={cardProps.link} alt={cardProps.name} className="grid__element-photo"/>
      <div className="grid__container">
        <h2 className="grid__element-header">{cardProps.name}</h2>
        <div className="grid__like-container">
          <button type="button" aria-label="Мне нравится" className="grid__like-button"></button>
          <p className="grid__like-count">{cardProps.likes.length}</p>
        </div>
      </div>
      <button type="button" aria-label="Удалить" className="grid__delete-element"></button>
    </div>
  )

}

export default Card