import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    <div className="pop-up pop-up_type_edit-profile">
      <div className="pop-up__container pop-up__container_type_edit-profile">
        <h2 className="pop-up__title">Редактировать профиль</h2>
        <form noValidate className="pop-up__form pop-up__form_type_profile" name="edit-profile">
          <button type="button" aria-label="Закрыть"
                  className="pop-up__button-close"></button>
          <label htmlFor="pop-up__name-input" className="pop-up__label">
            <input id="pop-up__name-input" type="text" name="edit-name" minLength="2" maxLength="40" required
                   className="pop-up__input pop-up__input_type_name" placeholder="Имя, фамилия"/>
              <span className="pop-up__name-input-error pop-up__error-message"></span>
          </label>
          <label htmlFor="pop-up__job-input" className="pop-up__label">
            <input id="pop-up__job-input" type="text" name="edit-job" minLength="2" maxLength="200" required
                   className="pop-up__input pop-up__input_type_job" placeholder="О себе"/>
              <span className="pop-up__job-input-error pop-up__error-message"></span>
          </label>
          <button type="submit" aria-label="Сохранить" className="pop-up__button">Сохранить</button>
        </form>
      </div>
    </div>
    <div className="pop-up pop-up_type_edit-avatar">
      <div className="pop-up__container pop-up__container_type_edit-profile">
        <h2 className="pop-up__title">Обновить аватар</h2>
        <form noValidate className="pop-up__form pop-up__form_type_profile" name="edit-profile">
          <button type="button" aria-label="Закрыть"
                  className="pop-up__button-close"></button>
          <label htmlFor="pop-up__name-input" className="pop-up__label">
            <input id="pop-up__avatar-input" type="url" name="edit-avatar" required
                   className="pop-up__input pop-up__input_type_avatar" placeholder="Ссылка на аватар"/>
              <span className="pop-up__avatar-input-error pop-up__error-message"></span>
          </label>
          <button type="submit" aria-label="Сохранить" className="pop-up__button">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="pop-up pop-up_type_add-place">
      <div className="pop-up__container pop-up__container_type_add-place">
        <h2 className="pop-up__title">Новое место</h2>
        <form noValidate className="pop-up__form pop-up__form_type_place" name="add-place">
          <button type="button" aria-label="Закрыть"
                  className="pop-up__button-close"></button>
          <label htmlFor="pop-up__place-input" className="pop-up__label">
            <input id="pop-up__place-input" type="text" name="add-place" placeholder="Название"
                   className="pop-up__input pop-up__input_type_place" minLength="2" maxLength="30" required />
              <span className="pop-up__place-input-error pop-up__error-message"></span>
          </label>
          <label htmlFor="pop-up__link-input" className="pop-up__label">
            <input id="pop-up__link-input" type="url" name="add-link" placeholder="Ссылка на картинку"
                   className="pop-up__input pop-up__input_type_link" required />
              <span className="pop-up__link-input-error pop-up__error-message"></span>
          </label>
          <button type="submit" aria-label="Создать" className="pop-up__button">Создать</button>
        </form>
      </div>
    </div>

    <div className="pop-up pop-up_type_view-place">
      <div className="pop-up__container pop-up__container_type_view-place">
        <img src="images" alt="" className="pop-up__image" />
          <h2 className="pop-up__caption"></h2>
          <button type="button" aria-label="Закрыть"
                  className="pop-up__button-close"></button>
      </div>
    </div>

    <div className="pop-up pop-up_type_confirm">
      <div className="pop-up__container pop-up__container_type_confirm">
        <h2 className="pop-up__title pop-up__title_type_confirm">Вы уверены?</h2>
        <form noValidate className="pop-up__form pop-up__form_type_confirm" name="confirm">
          <button type="button" aria-label="Закрыть"
                  className="pop-up__button-close"></button>
          <button type="submit" aria-label="Да" className="pop-up__button">Да</button>
        </form>
      </div>
    </div>

    <template className="template">
      <div className="grid__element">
        <img src="images/dombay.jpg" alt="" className="grid__element-photo" />
          <div className="grid__container">
            <h2 className="grid__element-header"></h2>
            <div className="grid__like-container">
              <button type="button" aria-label="Мне нравится" className="grid__like-button"></button>
              <p className="grid__like-count"></p>
            </div>
          </div>
          <button type="button" aria-label="Удалить" className="grid__delete-element"></button>
      </div>
    </template>
  </>
);
}

export default App;
