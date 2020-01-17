const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export default class Movies {

  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
  }

  getMovies() {
    switch (this._activeFilterType) {
      case FilterType.WATCHLIST:
        return this._movies.filter((it) => it.isWatchlist);
      case FilterType.HISTORY:
        return this._movies.filter((it) => it.isHistory);
      case FilterType.FAVORITES:
        return this._movies.filter((it) => it.isFavorites);
    }

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

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandler();
  }

  onFilterChange(handler) {
    this._filterChangeHandler = handler;
  }

  getFilter() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        link: filterType,
        title: filterType[0].toUpperCase() + filterType.slice(1),
        count: this._movies.filter((film) => film[`is${filterType[0].toUpperCase()}${filterType.slice(1)}`]).length,
        isActive: this._activeFilterType === filterType
      };
    });

    return filters;
  }

}
