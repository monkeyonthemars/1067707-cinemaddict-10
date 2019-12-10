import FilmCardComponent from './components/film-card.js';
import FilmDetailsComponent from './components/film-details.js';
import MainFilmsComponent from './components/main-films.js';
import MainMenuComponent from './components/main-menu.js';
import ProfileRatingComponent from './components/profile-rating.js';
import ShowMoreButtonComponent from './components/show-more-button.js';

import {generateFilmCards} from './mock/film.js';
import {generateUserInfo} from './mock/user.js';
import {generateSiteMenu, generateSortMenu} from './mock/menu.js';
import {generateComments} from './mock/comments.js';

import {RenderPosition, render} from './render.js';

const MOVIE_CARD_COUNT = 10;
const MOVIE_CARD_SHOW_COUNT = 5;
const MAX_SORTED_FILMS = 2;

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new ProfileRatingComponent(generateUserInfo()), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const menu = {
  siteMenu: generateSiteMenu(),
  sortMenu: generateSortMenu()
};
render(siteMainElement, new MainMenuComponent(menu), RenderPosition.BEFOREEND);
render(siteMainElement, new MainFilmsComponent(), RenderPosition.BEFOREEND);

let startMoviesBlock = 0;
let endMoviesBlock = MOVIE_CARD_SHOW_COUNT;

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, new ShowMoreButtonComponent(), RenderPosition.BEFOREEND);
const showMoreButtonElement = document.querySelector(`.films-list__show-more`);

const renderMoviesBlock = () => {
  films
    .slice(startMoviesBlock, endMoviesBlock)
    .forEach((film) => render(filmsListContainer, new FilmCardComponent(film), RenderPosition.BEFOREEND));

  startMoviesBlock = endMoviesBlock;
  endMoviesBlock += MOVIE_CARD_SHOW_COUNT;

  if (startMoviesBlock >= MOVIE_CARD_COUNT) {
    showMoreButtonElement.classList.add(`visually-hidden`);
  }
};

const filmsListContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
const films = generateFilmCards(MOVIE_CARD_COUNT);
renderMoviesBlock();

showMoreButtonElement.addEventListener(`click`, renderMoviesBlock);

const filmsListExtraContainer = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

const getSotredArray = (arr, sortField) => {
  return arr.slice().sort(function (first, second) {
    return second[sortField] - first[sortField];
  }).slice(0, MAX_SORTED_FILMS);
};

// TODO переделать обращение к элементу по индексу
getSotredArray(films, `rating`)
  .forEach((film) => render(filmsListExtraContainer[0], new FilmCardComponent(film), RenderPosition.BEFOREEND));

// TODO переделать обращение к элементу по индексу
getSotredArray(films, `commentsCount`)
  .forEach((film) => render(filmsListExtraContainer[1], new FilmCardComponent(film), RenderPosition.BEFOREEND));

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, new FilmDetailsComponent(films[0], generateComments()), RenderPosition.BEFOREEND);
