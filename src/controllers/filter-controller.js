import Filter from '../components/filter.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const oldComponent = this._filterComponent;

    this._filterComponent = new Filter(this._moviesModel.getFilter());
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterName) {
    this._moviesModel.setFilter(filterName);
    this.render();
  }
}
