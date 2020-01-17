import AbstractComponent from './abstract-component.js';
import {generateSortMenu} from '../mock/menu.js';

const generateSiteMenuList = (data) => {
  return data
    .map((item) => {
      return (
        `<a href="#${item.link}" class="main-navigation__item
        ${item.isActive ? ` main-navigation__item--active` : ``}">
        ${item.title}${item.count === `` ? `` : `
        <span class="main-navigation__item-count">${item.count}</span>`}</a>`
      );
    }).join(`\n`);
};

const generateSortMenuList = (data) => {
  return data
    .map((item) => {
      return (`<li><a href="#" class="sort__button">${item}</a></li>`
      );
    }).join(`\n`);
};

const createMainMenuTemplate = (data) => {

  let sortMenu = generateSortMenu();

  const siteMenuList = generateSiteMenuList(data);
  const sortMenuList = generateSortMenuList(sortMenu);

  return `<nav class="main-navigation">
      ${siteMenuList}
    </nav>
    <ul class="sort">
      ${sortMenuList}
    </ul>`;
};

export default class MainMenu extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createMainMenuTemplate(this._menu);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.hash.slice(1);
      handler(filterName);
    });
  }

}
