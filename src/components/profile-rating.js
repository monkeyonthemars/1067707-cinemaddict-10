import AbstractComponent from './abstract-component.js';
import {getUserRate} from '../models/profile.js';

const createProfileRatingTemplate = (watchedFilmsCount) => {
  const profile = `<p class="profile__rating">${getUserRate(watchedFilmsCount)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`;

  return `<section class="header__profile profile">${watchedFilmsCount === 0 ? `` : profile}</section>`;
};

export default class ProfileRating extends AbstractComponent {
  constructor(watchedFilmsCount) {
    super();
    this._watchedFilmsCount = watchedFilmsCount;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._watchedFilmsCount);
  }

  setWatchedFilmsCount(watchedFilmsCount) {
    this._watchedFilmsCount = watchedFilmsCount;
  }
}
