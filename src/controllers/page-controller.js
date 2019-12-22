import ShowMoreButtonComponent from '../components/show-more-button.js';

import {RenderPosition, render, remove} from '../utils/render.js';
import {getSotredArray} from '../utils/array.js';

import MovieController from './movie-controller.js';

const FILMS_COUNT_IN_BLOCK = 5;
const MAX_SORTED_FILMS = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmsListContainer = this._container.querySelector(`.films-list .films-list__container`);
    this._filmsListExtraContainer = this._container.querySelectorAll(`.films-list--extra .films-list__container`);

    this._films = null;
    this._startBlock = 0;
    this._endBlock = FILMS_COUNT_IN_BLOCK;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._renderFilmsBlock = this._renderFilmsBlock.bind(this);

    this._showedFilmsControllers = [];
  }

  render(films) {
    this._films = films;

    render(
        this._container.querySelector(`.films-list`),
        this._showMoreButtonComponent,
        RenderPosition.BEFOREEND
    );

    this._startBlock = 0;
    this._renderFilmsBlock();

    this._showMoreButtonComponent.setClickHandler(() => {
      this._startBlock = this._endBlock;
      this._endBlock += FILMS_COUNT_IN_BLOCK;
      this._renderFilmsBlock();
    });

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderFilms(container, films) {
    films.forEach((film) => {
      const controller = new MovieController(container, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers.push(controller);
      controller.render(film);
    });
  }

  _renderFilmsBlock() {
    this._renderFilms(
        this._filmsListContainer,
        this._films.slice(this._startBlock, this._endBlock));

    if (this._endBlock >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderTopRatedFilms() {
    // TODO переделать обращение к элементу по индексу
    this._renderFilms(
        this._filmsListExtraContainer[0],
        getSotredArray(this._films, `rating`, MAX_SORTED_FILMS));
  }

  _renderMostCommentedFilms() {
    // TODO переделать обращение к элементу по индексу
    this._renderFilms(
        this._filmsListExtraContainer[1],
        getSotredArray(this._films, `commentsCount`, MAX_SORTED_FILMS));
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _onDataChange(oldFilm, newFilm) {
    this._films.splice(
        this._films.findIndex((film) => film === oldFilm),
        1,
        newFilm);
    this._removeFilms();
    this.render(this._films);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((filmController) => filmController.setDefaultView());
  }
}
