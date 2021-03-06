import {toISODate} from '../utils/date.js';

export default class Movie {
  constructor(movie) {
    this.id = movie[`id`];
    this.comments = movie[`comments`] || [];
    this.title = movie[`film_info`][`title`];
    this.alternativeTitle = movie[`film_info`][`alternative_title`];
    this.totalRating = movie[`film_info`][`total_rating`];
    this.poster = movie[`film_info`][`poster`];
    this.ageRating = movie[`film_info`][`age_rating`];
    this.director = movie[`film_info`][`director`];
    this.writers = movie[`film_info`][`writers`] || [];
    this.actors = movie[`film_info`][`actors`] || [];
    this.releaseDate = movie[`film_info`][`release`][`date`] ? new Date(movie[`film_info`][`release`][`date`]) : null;
    this.releaseCountry = movie[`film_info`][`release`][`release_country`];
    this.runtime = movie[`film_info`][`runtime`];
    this.genre = movie[`film_info`][`genre`] || [];
    this.description = movie[`film_info`][`description`];
    this.personalRating = movie[`user_details`][`personal_rating`];
    this.isWatchlist = Boolean(movie[`user_details`][`watchlist`]);
    this.isHistory = Boolean(movie[`user_details`][`already_watched`]);
    this.watchingDate = movie[`user_details`][`watching_date`] ? new Date(movie[`user_details`][`watching_date`]) : null;
    this.isFavorites = Boolean(movie[`user_details`][`favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.totalRating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate ? toISODate(this.releaseDate) : null,
          'release_country': this.releaseCountry
        },
        'runtime': this.runtime,
        'genre': this.genre,
        'description': this.description,
      },
      'user_details': {
        'personal_rating': this.personalRating,
        'watchlist': this.isWatchlist,
        'already_watched': this.isHistory,
        'watching_date': this.watchingDate ? toISODate(this.watchingDate) : null,
        'favorite': this.isFavorites,
      },
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static cloneMovie(data) {
    return new Movie(data.toRAW());
  }
}
