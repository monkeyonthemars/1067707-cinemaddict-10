import AbstractComponent from './abstract-component.js';

export const MenuType = {
  FILTER: `filter`,
  STATS: `stats`,
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createFilterTemplate = (menuData, activeItem) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" data-menu-type="${MenuType.FILTER}" class="main-navigation__item ${menuData[FilterType.ALL].isActive && activeItem === MenuType.FILTER ? `main-navigation__item--active` : ``}">All movies</a>
      <a href="#watchlist" data-menu-type="${MenuType.FILTER}" class="main-navigation__item ${menuData[FilterType.WATCHLIST].isActive && activeItem === MenuType.FILTER ? `main-navigation__item--active` : ``}">${menuData.watchlist.title} <span class="main-navigation__item-count">${menuData.watchlist.count}</span></a>
      <a href="#history" data-menu-type="${MenuType.FILTER}" class="main-navigation__item ${menuData[FilterType.HISTORY].isActive && activeItem === MenuType.FILTER ? `main-navigation__item--active` : ``}">${menuData.history.title} <span class="main-navigation__item-count">${menuData.history.count}</span></a>
      <a href="#favorites" data-menu-type="${MenuType.FILTER}" class="main-navigation__item ${menuData[FilterType.FAVORITES].isActive && activeItem === MenuType.FILTER ? `main-navigation__item--active` : ``}">${menuData.favorites.title} <span class="main-navigation__item-count">${menuData.favorites.count}</span></a>
      <a href="#stats" data-menu-type="${MenuType.STATS}" class="main-navigation__item ${activeItem === MenuType.STATS ? `main-navigation__item--active` : ``} main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(menu, activeItem) {
    super();
    this._menu = menu;
    this._activeItem = activeItem;
  }

  getTemplate() {
    return createFilterTemplate(this._menu, this._activeItem);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterName = evt.target.hash.slice(1);
      handler(filterName);
    });
  }

}
