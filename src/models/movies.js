import moment from 'moment';
import {FilterType, SortType} from '../components/filter.js';


export const Period = {
  ALL_TIME: moment(new Date(0)),
  TODAY: moment().subtract(1, `days`),
  WEEK: moment().subtract(1, `weeks`),
  MONTH: moment().subtract(1, `months`),
  YEAR: moment().subtract(1, `years`),
};

export default class Movies {

  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
  }

  getMovies() {

    let movies;

    switch (this._activeFilterType) {
      case FilterType.WATCHLIST:
        movies = this._movies.filter((it) => it.isWatchlist);
        break;
      case FilterType.HISTORY:
        movies = this._movies.filter((it) => it.isHistory);
        break;
      case FilterType.FAVORITES:
        movies = this._movies.filter((it) => it.isFavorites);
        break;
      case FilterType.ALL:
      default:
        movies = this._movies;
        break;
    }

    switch (this._activeSortType) {
      case SortType.RATING:
        movies = movies.sort((a, b) => b.totalRating - a.totalRating);
        break;
      case SortType.DATE:
        movies = movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
    }

    return movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  updateMovie(id, movie) {
    const index = this._movie.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._tasks.slice(index + 1));

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandler();
  }

  onFilterChange(handler) {
    this._filterChangeHandler = handler;
  }

  getFilter() {
    const filters = {};
    for (const filterType of Object.values(FilterType)) {
      filters[filterType] = {
        link: filterType,
        title: filterType[0].toUpperCase() + filterType.slice(1),
        count: this._movies.filter((film) => film[`is${filterType[0].toUpperCase()}${filterType.slice(1)}`]).length,
        isActive: this._activeFilterType === filterType
      };
    }

    return filters;
  }

  setSorting(sortType) {
    this._activeSortType = sortType;
  }

  getUserMoviesStats(period) {
    const moviesFromPeriod = this._movies
      .filter((movie) => movie.isHistory && moment(movie.watchingDate) >= period);

    const moviesStats = {
      moviesNumber: this._getMoviesCount(moviesFromPeriod),
      duration: this._getMoviesDuration(moviesFromPeriod),
      genres: this._getMoviesGenres(moviesFromPeriod)
    };

    return moviesStats;
  }

  _getMoviesCount(movies) {
    return movies.length;
  }

  _getMoviesDuration(movies) {
    return movies
      .reduce((acc, it) => {
        return acc + it.runtime;
      }, 0);
  }

  _getMoviesGenres(movies) {
    const genresCounter = {};
    const genres = [];

    movies.forEach((movie) => {
      Array.from(movie.genre).forEach((genre) => {
        genresCounter[genre] = (genresCounter[genre] || 0) + 1;
      });
    });

    Object.keys(genresCounter).forEach((genre) => {
      genres.push({name: genre, moviesNumber: genresCounter[genre]});
    });

    return genres.sort((a, b) => b.moviesNumber - a.moviesNumber);
  }

  getWatchedFilmsCount() {
    return this._movies.filter((it) => it.isWatchlist).length;
  }

}
