'use strict';

const MOVIE_CARD_COUNT = 5;
const MOVIE_CARD_EXTRA_COUNT = 2;

const createFilmCardTemplate = () => {
  return `<article class="film-card">
    <h3 class="film-card__title"></h3>
    <p class="film-card__rating"></p>
    <p class="film-card__info">
      <span class="film-card__year"></span>
      <span class="film-card__duration"></span>
      <span class="film-card__genre"></span>
    </p>
    <img src="" alt="" class="film-card__poster">
    <p class="film-card__description"></p>
    <a class="film-card__comments">comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

const createFilmDetailsTemplate = () => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="" alt="">

          <p class="film-details__age"></p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title"></h3>
              <p class="film-details__title-original"></p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating"></p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell"></td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term"></td>
              <td class="film-details__cell">
                <span class="film-details__genre"></span>
                <span class="film-details__genre"></span>
                <span class="film-details__genre"></span></td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count"></span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="" alt="emoji" width="55" height="55">
            </span>
            <div>
              <p class="film-details__comment-text"></p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author"></span>
                <span class="film-details__comment-day"></span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="" alt="emoji" width="55" height="55">
            </span>
            <div>
              <p class="film-details__comment-text"></p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author"></span>
                <span class="film-details__comment-day"></span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="" alt="emoji" width="55" height="55">
            </span>
            <div>
              <p class="film-details__comment-text"></p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author"></span>
                <span class="film-details__comment-day"></span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="" alt="emoji" width="55" height="55">
            </span>
            <div>
              <p class="film-details__comment-text"></p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author"></span>
                <span class="film-details__comment-day"></span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`;
};

const createMainMenuTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count"></span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count"></span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count"></span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

const createProfileRatingTemplate = () => {
  return `<section class="header__profile profile">
    <p class="profile__rating"></p>
    <img class="profile__avatar" src="" alt="Avatar" width="35" height="35">
  </section>`;
};

const createMainFilmsTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createMainFilmsTemplate(), `beforeend`);

const filmsListContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < MOVIE_CARD_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const filmsListExtraContainer = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListExtraContainer.forEach((el) => {
  for (let i = 0; i < MOVIE_CARD_EXTRA_COUNT; i++) {
    render(el, createFilmCardTemplate(), `beforeend`);
  }
});

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
