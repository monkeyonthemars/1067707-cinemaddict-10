import {render, RenderPosition, replace} from '../utils/render.js';
import {Period} from '../models/movies.js';
import {getUserRate} from '../models/profile.js';
import Statistics from '../components/statistics.js';

export default class StatisticsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._statistics = null;
    this._period = Period.ALL_TIME;
  }

  render() {
    const oldComponent = this._statistics;
    const watchedFilmsCount = this._moviesModel.getWatchedFilmsCount();
    const userMoviesStats = this._moviesModel.getUserMoviesStats(this._period);
    const userRate = getUserRate(watchedFilmsCount);
    this._statistics = new Statistics(userMoviesStats, userRate);
    this._statistics.setCheckedPeriod(this._period);

    this._statistics.setChangePeriod((period) => {
      this._period = period;
      this.render();
    });

    if (oldComponent) {
      replace(this._statistics, oldComponent);
    } else {
      render(this._container, this._statistics, RenderPosition.BEFOREEND);
    }
  }

  show() {
    if (this._statistics) {
      this._statistics.show();
    }
  }

  hide() {
    if (this._statistics) {
      this._statistics.hide();
    }
  }
}
