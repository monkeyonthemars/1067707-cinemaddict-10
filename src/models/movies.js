export default class Movies {

  constructor() {
    this._movies = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  updateTask(id, movie) {
    const index = this._movie.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._tasks.slice(index + 1));

    return true;
  }

}
