import AbstractComponent from './abstract-component.js';

const getUserRate = (watchedFilmsCount) => {

  switch (true) {
    case (watchedFilmsCount > 0 && watchedFilmsCount < 11):
      return `novice`;
    case (watchedFilmsCount > 10 && watchedFilmsCount < 21):
      return `fan`;
    case (watchedFilmsCount > 20):
      return `movie buff`;
    default:
      return ``;
  }

};

const createProfileRatingTemplate = (watchedFilmsCount) => {

  const userRate = getUserRate(watchedFilmsCount);

  return `<section class="header__profile profile">
    <p class="profile__rating">${userRate}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
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
