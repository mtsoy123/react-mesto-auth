function PopupWithForm ({name, isOpen, onClose, title, children}) {

  return (
    <>
      <div className={`pop-up pop-up_type_${name} ${isOpen===true && "pop-up_opened"}`}
           onClick={onClose}>
        <div className={`pop-up__container pop-up_type_${name}`}>
          <h2 className="pop-up__title">{title}</h2>
          {/*// NB pop-up__form_type_profile используется в валидации*/}
          <form noValidate className={`pop-up__form pop-up_type_${name}`} name={name}>
            <button type="button" aria-label="Закрыть"
                    className="pop-up__button-close"></button>
            {children}
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm;