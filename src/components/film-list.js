import AbstractComponent from './abstract-component.js';

const createFilmListTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">There are no movies in our database</h2>
      <div class="films-list__container">

      </div>

    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">

      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

export default class FilmList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmListTemplate();
  }

  showNoMoviesError() {
    this.getElement().querySelector(`.films-list__title`).classList.remove(`visually-hidden`);
    Array.from(this.getElement().querySelectorAll(`.films-list--extra`))
      .forEach((el) => el.classList.add(`visually-hidden`));
  }

  hideTopRatedBlock() {
    Array.from(this.getElement().querySelectorAll(`.films-list--extra`))[0].classList.add(`visually-hidden`);
  }

  hideMostCommentedBlock() {
    Array.from(this.getElement().querySelectorAll(`.films-list--extra`))[1].classList.add(`visually-hidden`);
  }

  showLoading() {
    const loadingElement = this.getElement().querySelector(`.films-list .films-list__title`);
    loadingElement.innerHTML = `Loading...`;
    loadingElement.classList.remove(`visually-hidden`);
  }

}
