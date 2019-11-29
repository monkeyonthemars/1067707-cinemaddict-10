import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createMainFilmsTemplate} from './components/main-films.js';
import {createMainMenuTemplate} from './components/main-menu.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';

const MOVIE_CARD_COUNT = 5;
const MOVIE_CARD_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createMainFilmsTemplate(), `beforeend`);

const filmsListContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < MOVIE_CARD_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const filmsListExtraContainer = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListExtraContainer.forEach((el) => {
  for (let i = 0; i < MOVIE_CARD_EXTRA_COUNT; i++) {
    render(el, createFilmCardTemplate(), `beforeend`);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
