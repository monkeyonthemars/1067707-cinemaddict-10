import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';

import {generateComments} from '../mock/comments.js';

import {RenderPosition, render, remove} from '../utils/render.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._closeFilmDetails = this._closeFilmDetails.bind(this);
  }

  _closeFilmDetails() {
    document.body.removeChild(this._filmDetailsComponent.getElement());

    this._mode = Mode.DEFAULT;
  }

  _openFilmDetails() {
    this._onViewChange();

    document.body.appendChild(this._filmDetailsComponent.getElement());

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetails);
    this._filmDetailsComponent.setRatingButtonClickHandler(this._closeFilmDetails);

    this._mode = Mode.DETAILS;
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmComponent);
  }

  render(film) {
    this._filmComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film, generateComments());

    this._filmComponent.setDetailButtonClickHandler(() => {
      this._openFilmDetails();
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(film.id, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(film.id, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(film.id, Object.assign({}, film, {
        isFavorites: !film.isFavorites,
      }));
    });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }
}
