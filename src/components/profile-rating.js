import {createElement} from '../utils.js';

// TODO на реальном сервере другая структура пользователя
const createProfileRatingTemplate = (user) => {

  const {rating} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileRating {
  constructor(user) {
    this._element = null;
    this._user = user;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._user);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
