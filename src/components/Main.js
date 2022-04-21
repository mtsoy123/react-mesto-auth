function Main () {

  function handleEditAvatarClick () {
    const popupEditAvatar = document.querySelector('.pop-up_type_edit-avatar');
    popupEditAvatar.classList.add('pop-up_opened')
  }

  function handleEditProfileClick () {
    const popupEditProfile = document.querySelector('.pop-up_type_edit-profile');
    popupEditProfile.classList.add('pop-up_opened')

  }

  function handleAddPlaceClick () {
    const popupnAddPlace = document.querySelector('.pop-up_type_add-place');
    popupnAddPlace.classList.add('pop-up_opened')
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" aria-label="Редактировать аватар" className="profile__button-avatar" onClick={handleEditAvatarClick}>
            <img src="../images" alt="Аватар" className="profile__avatar"/>
          </button>
          <div className="profile__info-container">
            <h1 className="profile__name"></h1>
            <p className="profile__job"></p>
            <button type="button" aria-label="Редактировать профиль" className="profile__button-edit" onClick={handleEditProfileClick}></button>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__button-add" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="grid">
      </section>
    </main>
  )
}

export default Main;