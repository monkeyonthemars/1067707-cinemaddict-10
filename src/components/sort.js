import AbstractComponent from './abstract-component.js';

const ACTIVE_BUTTON_CLASS = `sort__button--active`;

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const generateSortList = () => {
  return (
    `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by ${SortType.DEFAULT}</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by ${SortType.DATE}</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by ${SortType.RATING}</a></li>
    </ul>`
  );
};

const createSortTemplate = () => {
  return `<ul class="sort">
      ${generateSortList()}
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
      if (evt.target.nodeName !== `A`
      || evt.target.classList.contains(ACTIVE_BUTTON_CLASS)) {
        return;
      }

      evt.preventDefault();

      const sortType = evt.target.dataset.sortType;

      this.getElement().querySelector(`.${ACTIVE_BUTTON_CLASS}`).classList.remove(ACTIVE_BUTTON_CLASS);
      evt.target.classList.add(ACTIVE_BUTTON_CLASS);

      if (this._activeSortType === sortType) {
        return;
      }

      this._activeSortType = sortType;

      handler(this._activeSortType);
    });
  }

}
