import AbstractComponent from './abstract-component.js';

const generateSortMenu = () => {
  return [
    `Sort by default`,
    `Sort by date`,
    `Sort by rating`
  ];
};

const generateSortList = (sortMenu) => {
  return sortMenu
    .map((item) => {
      return (`<li><a href="#" class="sort__button">${item}</a></li>`
      );
    }).join(`\n`);
};

const createSortTemplate = () => {

  const sortMenu = generateSortMenu();
  const sortMenuList = generateSortList(sortMenu);

  return `<ul class="sort">
      ${sortMenuList}
    </ul></div>`;
};

export default class Sort extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createSortTemplate(this._menu);
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const sortName = evt.target.hash.slice(1);
      handler(sortName);
    });
  }

}
