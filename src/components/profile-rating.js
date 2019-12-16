import AbstractComponent from './abstract-component.js';

// TODO на реальном сервере другая структура пользователя
const createProfileRatingTemplate = (user) => {

  const {rating} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileRating extends AbstractComponent {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._user);
  }
}
