function Main () {

  function handleEditAvatarClick () {
//123
  }


  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" aria-label="Редактировать аватарЭ" className="profile__button-avatar">
            <img src="../images" alt="Аватар" className="profile__avatar"/>
          </button>
          <div className="profile__info-container">
            <h1 className="profile__name"></h1>
            <p className="profile__job"></p>
            <button type="button" aria-label="Редактировать профиль" className="profile__button-edit"></button>
          </div>
        </div>
        <button type="button" aria-label="Добавить" className="profile__button-add"></button>
      </section>
      <section className="grid">
      </section>
    </main>
  )
}

export default Main;