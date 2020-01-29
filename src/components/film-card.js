import AbstractComponent from './abstract-component.js';
import {formatYear} from '../utils/date.js';

const MAX_LENGTH_DESCRIPTION = 140;
const FILM_CARD_CONTROLS_ITEM_ACTIVE = ` film-card__controls-item--active`;

const createFilmCardTemplate = (film, commentsCount) => {

  const {
    title,
    runtime,
    genre,
    poster,
    description,
    totalRating,
    isFavorites,
    isHistory,
    isWatchlist,
    releaseDate
  } = film;

  const getShortText = (text, length) => {
    if (text.length > length) {
      return text.substr(0, length - 1) + `...`;
    }

    return text;
  };

  const shortDescription = getShortText(description, MAX_LENGTH_DESCRIPTION);
  const firstGenre = genre[0];
  const watchlist = isWatchlist ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;
  const history = isHistory ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;
  const favorites = isFavorites ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;

  return (
    `<article class="film-card">
       <h3 class="film-card__title">${title}</h3>
       <p class="film-card__rating">${totalRating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${formatYear(releaseDate)}</span>
         <span class="film-card__duration">${runtime}</span>
         <span class="film-card__genre">${firstGenre}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${shortDescription}</p>
       <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${watchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${history}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${favorites}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(data) {
    super();
    this._film = data;
    this._commentsCount = data.comments.length;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._commentsCount);
  }

  setDetailButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
