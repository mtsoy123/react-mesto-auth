function ImagePopup({isOpen, selectedCard, onClose}) {

  return (
    <div onClick={onClose} className={`pop-up pop-up_type_view-place ${isOpen === true && 'pop-up_opened'}`}>
      <div className="pop-up__container pop-up__container_type_view-place">
        <img src={selectedCard.link} alt="" className="pop-up__image"/>
        <h2 className="pop-up__caption">{selectedCard.name}</h2>
        <button type="button" aria-label="Закрыть"
                className="pop-up__button-close"></button>
      </div>
    </div>
  )
}

export default ImagePopup;