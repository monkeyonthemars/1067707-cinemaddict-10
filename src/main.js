import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createMainFilmsTemplate} from './components/main-films.js';
import {createMainMenuTemplate} from './components/main-menu.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {generateFilmCards} from './mock/film.js';
import {generateUserInfo} from './mock/user.js';
import {generateSiteMenu, generateSortMenu} from './mock/menu.js';
import {generateComments} from './mock/comments.js';

const MOVIE_CARD_COUNT = 10;
const MOVIE_CARD_SHOW_COUNT = 5;
const MAX_SORTED_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const userInfo = generateUserInfo();
render(siteHeaderElement, createProfileRatingTemplate(userInfo), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
const menu = {
  siteMenu: generateSiteMenu(),
  sortMenu: generateSortMenu()
};
render(siteMainElement, createMainMenuTemplate(menu), `beforeend`);
render(siteMainElement, createMainFilmsTemplate(), `beforeend`);

let startMoviesBlock = 0;
let endMoviesBlock = MOVIE_CARD_SHOW_COUNT;

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, createShowMoreButtonTemplate(), `beforeend`);
const showMoreButtonElement = document.querySelector(`.films-list__show-more`);

const renderMoviesBlock = () => {
  for (let film of films.slice(startMoviesBlock, endMoviesBlock)) {
    render(filmsListContainer, createFilmCardTemplate(film), `beforeend`);
  }
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

for (let film of getSotredArray(films, `rating`)) {
  render(filmsListExtraContainer[0], createFilmCardTemplate(film), `beforeend`); // TODO [0]
}

for (let film of getSotredArray(films, `commentsCount`)) {
  render(filmsListExtraContainer[1], createFilmCardTemplate(film), `beforeend`); // TODO [1]
}

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsTemplate(films[0], generateComments()), `afterend`);
