import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';

import {generateComments} from '../mock/comments.js';

import {RenderPosition, render, remove} from '../utils/render.js';
import {getSotredArray} from '../utils/common.js';

const FILMS_COUNT_IN_BLOCK = 5;
const MAX_SORTED_FILMS = 2;

const renderFilmDetails = (film) => {
  render(
      document.querySelector(`body`),
      new FilmDetailsComponent(film, generateComments()),
      RenderPosition.BEFOREEND
  );
};

const renderFilmCard = (container, film) => {
  render(container, new FilmCardComponent(film), RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    render(
        this._container.querySelector(`.films-list`),
        this._showMoreButtonComponent,
        RenderPosition.BEFOREEND
    );

    const renderFilmsBlock = () => {
      const filmsListContainer = this._container.querySelector(`.films-list .films-list__container`);
      let startBlock = 0;
      let endBlock = FILMS_COUNT_IN_BLOCK;

      films
        .slice(startBlock, endBlock)
        .forEach((film) => renderFilmCard(filmsListContainer, film));

      startBlock = endBlock;
      endBlock += FILMS_COUNT_IN_BLOCK;

      if (startBlock >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    renderFilmsBlock();

    this._showMoreButtonComponent.setClickHandler(renderFilmsBlock);

    const filmsListExtraContainer = this._container.querySelectorAll(`.films-list--extra .films-list__container`);
    // TODO переделать обращение к элементу по индексу
    getSotredArray(films, `rating`, MAX_SORTED_FILMS)
      .forEach((film) => renderFilmCard(filmsListExtraContainer[0], film));
    // TODO переделать обращение к элементу по индексу
    getSotredArray(films, `commentsCount`, MAX_SORTED_FILMS)
      .forEach((film) => renderFilmCard(filmsListExtraContainer[1], film));

    renderFilmDetails(films[0]);
  }
}
