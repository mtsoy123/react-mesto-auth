function Card({card, onCardClick, cardProps}) {

  function handleClick() {
    onCardClick(cardProps);
  }

  return(
    <div onClick={handleClick}>
      {card}
    </div>
  )

}

export default Card