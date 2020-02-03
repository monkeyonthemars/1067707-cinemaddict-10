import ShowMoreButtonComponent from '../components/show-more-button.js';
import SortComponent from '../components/sort.js';

import {RenderPosition, render, remove} from '../utils/render.js';
import {getSotredArrayByFieldName, getSotredArrayByFieldLength} from '../utils/array.js';

import MovieController from './movie-controller.js';

const FILMS_COUNT = {
  IN_BLOCK: 5,
  MAX_SORTED: 2
};

export default class PageController {
  constructor(container, moviesModel, api, filtersController, filmListComponent) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;
    this._filtersController = filtersController;
    this._filmListComponent = filmListComponent;

    this._filmsListContainer = this._container.querySelector(`.films-list .films-list__container`);
    this._filmsListExtraContainer = this._container.querySelectorAll(`.films-list--extra .films-list__container`);

    this._films = this._moviesModel.getMovies();
    this._filmsFiltered = this._films;
    this._startBlock = 0;
    this._endBlock = FILMS_COUNT.IN_BLOCK;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._renderFilmsBlock = this._renderFilmsBlock.bind(this);

    this._showedFilmsControllers = [];

    this._isLoading = false;

    this._moviesModel.onFilterChange(this._onFilterChange);
  }

  _setShowMoreButtonClickHandler() {
    this._showMoreButtonComponent.setClickHandler(() => {
      this._renderFilmsBlock();
    });
  }

  setLoading(isLoading) {
    this._isLoading = isLoading;
  }

  render() {
    if (this._isLoading) {
      this._filmListComponent.showLoading();
      this._filmListComponent.hideMostCommentedBlock();
      this._filmListComponent.hideTopRatedBlock();
      return;
    }

    this._renderSortMenu();
    remove(this._showMoreButtonComponent);
    if (this._endBlock < this._filmsFiltered.length) {
      this._renderShowMoreButton();
      this._setShowMoreButtonClickHandler();
    }

    this._renderFilms(this._filmsListContainer, this._filmsFiltered.slice(0, this._endBlock));

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();

    this._sortComponent.setSortChangeHandler((sortType) => {
      this._moviesModel.setSorting(sortType);
      this._filmsFiltered = this._moviesModel.getMovies();
      this._removeFilms();
      this.render(this._filmsFiltered);
      this._onFilterChange(false);
    });
  }

  _renderSortMenu() {
    render(
        this._container,
        this._sortComponent,
        RenderPosition.AFTERBEGIN
    );
  }

  _renderShowMoreButton() {
    render(
        this._container.querySelector(`.films-list`),
        this._showMoreButtonComponent,
        RenderPosition.BEFOREEND);
  }

  _renderFilms(container, films) {
    films.forEach((film) => {
      const controller = new MovieController(
          container,
          this._onDataChange,
          this._onViewChange,
          this._api
      );
      this._showedFilmsControllers.push(controller);
      controller.renderFilm(film);
    });
  }

  _renderFilmsBlock() {
    this._startBlock = this._endBlock;
    this._endBlock += FILMS_COUNT.IN_BLOCK;
    this._renderFilms(
        this._filmsListContainer,
        this._filmsFiltered.slice(this._startBlock, this._endBlock));
    if (this._endBlock >= this._filmsFiltered.length) {
      remove(this._showMoreButtonComponent);
      return;
    }
  }

  _renderTopRatedFilms() {
    const topRatedMovies = getSotredArrayByFieldName(this._films, `totalRating`, FILMS_COUNT.MAX_SORTED);
    if (topRatedMovies.length === 0) {
      this._filmListComponent.hideTopRatedBlock();
      return;
    }
    this._renderFilms(
        this._filmsListExtraContainer[0],
        topRatedMovies);
  }

  _renderMostCommentedFilms() {
    const mostCommentedMovies = getSotredArrayByFieldLength(this._films, `comments`, FILMS_COUNT.MAX_SORTED);
    if (mostCommentedMovies.length === 0) {
      this._filmListComponent.hideMostCommentedBlock();
      return;
    }
    this._renderFilms(
        this._filmsListExtraContainer[1],
        mostCommentedMovies);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _onDataChange(oldFilmId, newFilm) {
    this._api.updateMovie(oldFilmId, newFilm)
    .then((film) => {
      this._films.splice(
          this._films.findIndex((filmItem) => filmItem.id === oldFilmId),
          1,
          film);
      this._moviesModel.setMovies(this._films);
      this._filmsFiltered = this._moviesModel.getMovies();
      this._filtersController.render();
      this._removeFilms();
      this.render();
    });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((filmController) => filmController.setDefaultView());
  }

  _onFilterChange() {
    this._startBlock = 0;
    this._endBlock = FILMS_COUNT.IN_BLOCK;
    this._removeFilms();
    this._filmsFiltered = this._moviesModel.getMovies();
    this._filtersController.render();
    this.render();
  }
}
