import ShowMoreButtonComponent from '../components/show-more-button.js';
import SortComponent from '../components/sort.js';

import {RenderPosition, render, remove} from '../utils/render.js';
import {getSotredArrayByFieldName, getSotredArrayByFieldLength} from '../utils/array.js';

import MovieController from './movie-controller.js';

const FILMS_COUNT_IN_BLOCK = 5;
const MAX_SORTED_FILMS = 2;

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
    this._filteredFilms = this._films;
    this._startBlock = 0;
    this._endBlock = FILMS_COUNT_IN_BLOCK;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._renderFilmsBlock = this._renderFilmsBlock.bind(this);

    this._showedFilmsControllers = [];

    this._isLoading = false;
    this._setShowMoreButtonClickHandler();

    this._moviesModel.onFilterChange(this._onFilterChange);
  }

  _setShowMoreButtonClickHandler() {
    this._showMoreButtonComponent.setClickHandler(() => {
      this._startBlock = this._endBlock;
      this._endBlock += FILMS_COUNT_IN_BLOCK;
      this._renderFilmsBlock();
      if (this._endBlock >= this._filteredFilms.length) {
        remove(this._showMoreButtonComponent);
        return;
      }
    });
  }

  setLoading(isLoading) {
    this._isLoading = isLoading;
  }

  render() {
    this._renderSortMenu();
    this._renderShowMoreButton();
    this._renderFilmsBlock();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();

    this._sortComponent.setSortChangeHandler((sortType) => {
      this._moviesModel.setSorting(sortType);
      this._filteredFilms = this._moviesModel.getMovies();
      this._removeFilms();
      this.render(this._films);
      this._onFilterChange();
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
    this._renderFilms(
        this._filmsListContainer,
        this._filteredFilms.slice(this._startBlock, this._endBlock));
  }

  _renderTopRatedFilms() {
    const topRatedMovies = getSotredArrayByFieldName(this._filteredFilms, `personalRating`, MAX_SORTED_FILMS);
    if (topRatedMovies.length === 0) {
      this._filmListComponent.hideTopRatedBlock();
      return;
    }
    this._renderFilms(
        this._filmsListExtraContainer[0],
        topRatedMovies);
  }

  _renderMostCommentedFilms() {
    const mostCommentedMovies = getSotredArrayByFieldLength(this._filteredFilms, `comments`, MAX_SORTED_FILMS);
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
      this._removeFilms();
      this.render(this._films);
      this._onFilterChange();
    });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((filmController) => filmController.setDefaultView());
  }

  _onFilterChange() {
    this._filteredFilms = this._moviesModel.getMovies();
    this._removeFilms();
    this.render();
    this._filtersController.render();
  }
}
