import FilmListComponent from './components/film-list.js';
import ProfileRatingComponent from './components/profile-rating.js';

import {generateFilmCards} from './mock/film.js';
import {generateUserInfo} from './mock/user.js';

import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';

import {RenderPosition, render} from './utils/render.js';
import MoviesModel from './models/movies.js';

const FILMS_CARD_COUNT = 8;

render(
    document.querySelector(`.header`),
    new ProfileRatingComponent(generateUserInfo()),
    RenderPosition.BEFOREEND
);

const siteMainElement = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
moviesModel.setMovies(generateFilmCards(FILMS_CARD_COUNT));

const filters = new FilterController(siteMainElement, moviesModel);
filters.render();

render(siteMainElement, new FilmListComponent(), RenderPosition.BEFOREEND);

new PageController(siteMainElement.querySelector(`.films`), moviesModel).render();
