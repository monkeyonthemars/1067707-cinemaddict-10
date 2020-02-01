import Movie from '../models/movie';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';

import {RenderPosition, render, remove} from '../utils/render.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._filmComments = [];
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._escPressHandler = this._escPressHandler.bind(this);
  }

  _closeFilmDetails() {
    document.body.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._escPressHandler);
    this._mode = Mode.DEFAULT;
  }

  _openFilmDetails() {
    this._api.getComments(this._filmComponent._film.id)
    .then((comments) => {
      this._filmComments = comments;
      this._onViewChange();
      this.renderFilmDetails(this._filmComponent._film, this._filmComments);
      this._filmDetailsComponent.enableAnimation();
      document.body.appendChild(this._filmDetailsComponent.getElement());
      this._filmDetailsComponent.recoveryListeners(this._closeFilmDetails);
      document.addEventListener(`keydown`, this._escPressHandler);
      this._mode = Mode.DETAILS;
    });
  }

  _updateFilmDetails(oldFilmId, newFilm) {
    document.body.removeChild(this._filmDetailsComponent.getElement());
    this._onDataChange(oldFilmId, newFilm);
    this.renderFilmDetails(newFilm, this._filmComments);
    this._filmDetailsComponent.disableAnimation();
    document.body.appendChild(this._filmDetailsComponent.getElement());
    this._filmDetailsComponent.recoveryListeners(this._closeFilmDetails);
  }

  destroy() {
    remove(this._filmComponent);
  }

  renderFilm(film) {
    this._filmComponent = new FilmCardComponent(film);

    this._filmComponent.setDetailButtonClickHandler(() => {
      this._openFilmDetails();
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isWatchlist = !newMovie.isWatchlist;
      this._onDataChange(film.id, newMovie);
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isHistory = !newMovie.isHistory;
      newMovie.watchingDate = new Date();
      if (!newMovie.isHistory) {
        newMovie.personalRating = 0;
      }
      this._onDataChange(film.id, newMovie);
    });

    this._filmComponent.setFavoritesButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isFavorites = !newMovie.isFavorites;
      this._onDataChange(film.id, newMovie);
    });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _updateComments(film) {
    document.body.removeChild(this._filmDetailsComponent.getElement());
    this.renderFilmDetails(film, this._filmComments);
    this._filmDetailsComponent.disableAnimation();
    document.body.appendChild(this._filmDetailsComponent.getElement());
    this._filmDetailsComponent.recoveryListeners(this._closeFilmDetails);
  }

  renderFilmDetails(film, comments) {
    this._filmDetailsComponent = new FilmDetailsComponent(film, comments);

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isWatchlist = !newMovie.isWatchlist;
      this._onMovieDataChange(film.id, newMovie);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isHistory = !newMovie.isHistory;
      newMovie.watchingDate = new Date();
      if (!newMovie.isHistory) {
        newMovie.personalRating = 0;
      }
      this._onMovieDataChange(film.id, newMovie);
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.isFavorites = !newMovie.isFavorites;
      this._onMovieDataChange(film.id, newMovie);
    });

    this._filmDetailsComponent.setDeleteCommentHandler((index) => {
      const commentId = this._filmComments[index].id;
      this._api.deleteComment(commentId).then(() => {
        this._filmComments = [].concat(this._filmComments.slice(0, index), this._filmComments.slice(index + 1));
        this._updateComments(film);
        this._onDataChange(film.id, film);
      }).catch(() => this._filmDetailsComponent.errorCommentDeleteHandler());
    });

    this._filmDetailsComponent.setNewCommentHandler((newComment) => {
      this._api.createComment(film.id, newComment)
      .then((newData) => {
        this._filmComments = newData.comments;
        this._updateFilmDetails(film.id, newData.movie);
      }).catch(() => this._filmDetailsComponent.errorCommentSubmitHandler());
    });

    this._filmDetailsComponent.setRatingButtonClickHandler((evt) => {
      const newMovie = Movie.cloneMovie(film);
      newMovie.personalRating = Number(evt.target.value);
      this._onRatingDataChange(film.id, newMovie);
    });

    if (film.isHistory) {
      this._filmDetailsComponent.setUndoRatingButtonClickHandler(() => {
        const newMovie = Movie.cloneMovie(film);
        newMovie.personalRating = 0;
        this._onMovieDataChange(film.id, newMovie);
      });
    }

  }

  _onMovieDataChange(oldFilmId, newFilm) {
    this._api.updateMovie(oldFilmId, newFilm)
    .then((film) => {
      this._updateFilmDetails(oldFilmId, film);
    });
  }

  _onRatingDataChange(oldFilmId, newFilm) {
    this._filmDetailsComponent.disableRatingElement();
    this._api.updateMovie(oldFilmId, newFilm)
    .then((film) => {
      this._updateFilmDetails(oldFilmId, film);
      this._filmDetailsComponent.enableRatingElement();
    }).catch(() => this._filmDetailsComponent.errorRatingSubmitHandler());
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  _escPressHandler(evt) {
    const isEscKey = evt.key === `Escape`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

}
