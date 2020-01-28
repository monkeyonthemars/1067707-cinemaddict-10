import API from './api.js';
import FilmListComponent from './components/film-list.js';
import ProfileRatingComponent from './components/profile-rating.js';
import StatisticsController from './controllers/statistics-controller.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import {RenderPosition, render} from './utils/render.js';
import MoviesModel from './models/movies.js';

export const MenuType = {
  FILTER: `filter`,
  STATS: `stats`,
};

const AUTHORIZATION = `Basic d51Cyrb1jS9nQ7`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const api = new API(END_POINT, AUTHORIZATION);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const filmListComponent = new FilmListComponent();
const moviesModel = new MoviesModel();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    const watchedFilmsCount = moviesModel.getWatchedFilmsCount();
    const profileComponent = new ProfileRatingComponent(watchedFilmsCount);
    render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);
    const filtersController = new FilterController(siteMainElement, moviesModel);
    filtersController.render();
    render(siteMainElement, filmListComponent, RenderPosition.BEFOREEND);

    const filmsElement = siteMainElement.querySelector(`.films`);
    const pageController = new PageController(filmsElement, moviesModel, api, filtersController);
    pageController.render();

    const statisticsController = new StatisticsController(siteMainElement, moviesModel);
    statisticsController.render();
    statisticsController.hide();

    filtersController.setChangeMenuHandler((menuType) => {
      switch (menuType) {
        case MenuType.FILTER:
          statisticsController.hide();
          filmListComponent.show();
          break;
        case MenuType.STATS:
          statisticsController.show();
          filmListComponent.hide();
          break;
      }
    });
  });
