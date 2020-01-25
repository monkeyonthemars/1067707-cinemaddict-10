import AbstractComponent from './abstract-component.js';

const generateFilterList = (filterMenu) => {
  return filterMenu
    .map((item) => {
      return (
        `<a href="#${item.link}" class="main-navigation__item
        ${item.isActive ? ` main-navigation__item--active` : ``}">
        ${item.title}${item.count === 0 ? `` : `
        <span class="main-navigation__item-count">${item.count}</span>`}</a>`
      );
    }).join(`\n`);
};

const createFilterTemplate = (filterMenu) => {

  const filterMenuList = generateFilterList(filterMenu);

  return `<nav class="main-navigation">
      ${filterMenuList}
    </nav>`;
};

export default class Filter extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createFilterTemplate(this._menu);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.hash.slice(1);
      handler(filterName);
    });
  }

}
