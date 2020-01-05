import AbstractComponent from './abstract-component.js';

const MAX_LENGTH_DESCRIPTION = 140;
const FILM_CARD_CONTROLS_ITEM_ACTIVE = ` film-card__controls-item--active`;

const createFilmCardTemplate = (film) => {

  const {title, rating, year, duration, genres, poster, description,
    commentsCount, isWatchlist, isWatched, isFavorite} = film;

  const getShortText = (text, length) => {
    if (text.length > length) {
      return text.substr(0, length - 1) + `...`;
    }

    return text;
  };

  const shortDescription = getShortText(description, MAX_LENGTH_DESCRIPTION);
  const genre = genres[0];
  const watchlist = isWatchlist ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;
  const watched = isWatched ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;
  const favorite = isFavorite ? FILM_CARD_CONTROLS_ITEM_ACTIVE : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title[`title`]}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${watchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${watched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${favorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
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
