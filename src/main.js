import FilmListComponent from './components/film-list.js';
import MainMenuComponent from './components/main-menu.js';
import ProfileRatingComponent from './components/profile-rating.js';

import {generateFilmCards} from './mock/film.js';
import {generateUserInfo} from './mock/user.js';
import {generateSiteMenu, generateSortMenu} from './mock/menu.js';

import PageController from './controllers/page-controller.js';

import {RenderPosition, render} from './utils/render.js';
import MoviesModel from './models/movies.js';

const FILMS_CARD_COUNT = 8;

render(
    document.querySelector(`.header`),
    new ProfileRatingComponent(generateUserInfo()),
    RenderPosition.BEFOREEND
);

const siteMainElement = document.querySelector(`.main`);
const menu = {
  siteMenu: generateSiteMenu(),
  sortMenu: generateSortMenu()
};
render(siteMainElement, new MainMenuComponent(menu), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmListComponent(), RenderPosition.BEFOREEND);

const moviesModel = new MoviesModel();
moviesModel.setMovies(generateFilmCards(FILMS_CARD_COUNT));
new PageController(siteMainElement.querySelector(`.films`), moviesModel).render();
