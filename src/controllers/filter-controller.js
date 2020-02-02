import Filter from '../components/filter.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export const MenuType = {
  FILTER: `filter`,
  STATS: `stats`,
};

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterComponent = null;
    this._activeItem = MenuType.FILTER;
  }

  render() {
    const oldComponent = this._filterComponent;
    this._filterComponent = new Filter(this._moviesModel.getFilter(), this._activeItem);
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  setChangeMenuHandler(handler) {
    this._container.addEventListener(`click`, (evt) => {
      const target = evt.target;
      const parentTarget = evt.target.parentNode;
      if ((target.nodeName !== `A` && parentTarget.nodeName !== `A`) || evt.target.dataset.menuType === undefined) {
        return;
      }
      const filterName = target.nodeName === `A` ? target.hash.slice(1) : parentTarget.hash.slice(1);
      this._moviesModel.setFilter(filterName);
      this._activeItem = evt.target.dataset.menuType;
      this.render();
      handler(this._activeItem);
    });
  }
}
