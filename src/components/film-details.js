import AbstractSmartComponent from './abstract-smart-component.js';
import {formatDate, formatDuration, formatCommentDate, toISODate} from '../utils/date.js';

const SHAKE_TIMEOUT = 600;
const RATE = {
  MAX: 9,
  EMPTY: 0
};

const generateCommentsList = (comments) => {
  return comments
    .map((commentItem) => {

      const {emotion, comment, author, date} = commentItem;

      return (`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${formatCommentDate(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    }).join(`\n`);
};

const generateGenresList = (genres) => {
  return `<td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
    <td class="film-details__cell">
      ${genres
        .map((genre) => {
          return (`<span class="film-details__genre">${genre}</span>`);
        }).join(`\n`)}
    </td>`;
};

const createFilmDetailsTemplate = (film, comments) => {
  const {
    title,
    alternativeTitle,
    ageRating,
    runtime,
    genre,
    poster,
    description,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    personalRating,
    totalRating,
    isFavorites,
    isHistory,
    isWatchlist,
  } = film;

  const commentsList = generateCommentsList(comments);
  const genresList = generateGenresList(genre);

  const watchlist = isWatchlist ? ` checked` : ``;
  const watched = isHistory ? ` checked` : ``;
  const favorite = isFavorites ? ` checked` : ``;

  const userRates = Array(RATE.MAX).fill(``);
  if (personalRating !== RATE.EMPTY) {
    userRates.splice(personalRating - 1, 0, `checked`);
  }

  const ratingTemplate = isHistory ?
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${alternativeTitle}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${userRates[0]}>
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${userRates[1]}>
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${userRates[2]}>
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${userRates[3]}>
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${userRates[4]}>
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${userRates[5]}>
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${userRates[6]}>
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${userRates[7]}>
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${userRates[8]}>
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>` : ``;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${alternativeTitle}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                ${genresList}
              </tr>
            </tbody></table>

            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${watchlist}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${watched}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${favorite}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      ${ratingTemplate}

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._isWatchlist = !!film.isWatchlist;
    this._isHistory = !!film.isHistory;
    this._isFavorites = !!film.isFavorites;
    this._selectedEmoji = null;
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this._setCloseButtonClickHandler();
    this._setEmojiHandler();
  }

  _setCloseButtonClickHandler() {
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeHandler);
  }

  setRatingButtonClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`)
      .forEach((item) => item.addEventListener(`click`, handler));
  }

  disableRatingElement() {
    this.getElement().querySelector(`.film-details__user-rating-score`).style.pointerEvents = `none`;
  }

  enableRatingElement() {
    this.getElement().querySelector(`.film-details__user-rating-score`).style.pointerEvents = `auto`;
  }

  setUndoRatingButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    this._film.isWatchlist = this._isWatchlist;
    this._film.isHistory = this._isHistory;
    this._film.isFavorites = this._isFavorites;

    return createFilmDetailsTemplate(this._film, this._comments);
  }

  recoveryListeners(handler) {
    this._closeHandler = handler;
    this._subscribeOnEvents();
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }

  setDeleteCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comments-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`film-details__comment-delete`)) {
          evt.preventDefault();
          const listItem = evt.target.closest(`li`);
          const index = Array.from(listItem.parentElement.children).indexOf(listItem);

          evt.target.textContent = `Deleting…`;
          evt.target.disables = true;

          handler(index);
        }
      });
  }

  setNewCommentHandler(handler) {
    const commentInput = this.getElement().querySelector(`.film-details__comment-input`);
    this.getElement().addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && evt.ctrlKey && this._selectedEmoji !== null) {
        const newComment = {
          comment: commentInput.value,
          emotion: this._selectedEmoji,
          date: toISODate(new Date())
        };

        commentInput.disabled = true;
        handler(newComment);
      }
    });
  }

  _setEmojiHandler() {
    const emoji = this.getElement().querySelectorAll(`.film-details__emoji-label`);
    emoji.forEach((element) => element.addEventListener(`click`, (evt) => {
      this.getElement()
        .querySelector(`.film-details__add-emoji-label`)
        .innerHTML = evt.target.outerHTML;
      this._selectedEmoji = evt.target.getAttribute(`src`).match(/.*\/(.+?)\./)[1];
    }));
  }

  disableAnimation() {
    this.getElement().style.animation = `none`;
  }

  enableAnimation() {
    this.getElement().removeAttribute(`style`);
  }

  errorRatingSubmitHandler(oldPersonalRating) {
    const ratingForm = this.getElement().querySelector(`.film-details__user-rating-score`);
    const ratingInputs = this.getElement().querySelectorAll(`.film-details__user-rating-input`);
    const uncheckedRatingInputs = this.getElement().querySelectorAll(`input[name="score"]:not(:checked)`);

    ratingForm.style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    ratingInputs.forEach((input) => (input.disabled = true));
    uncheckedRatingInputs.forEach((input) => (input.labels[0].style.backgroundColor = `red`));

    setTimeout(() => {
      ratingForm.style.animation = ``;
      ratingInputs.forEach((input) => (input.disabled = false));
      uncheckedRatingInputs.forEach((input) => (input.labels[0].style.backgroundColor = ``));
      this.getElement().querySelector(`input[name="score"]:checked`).checked = false;
      ratingInputs[oldPersonalRating - 1].checked = true;
    }, SHAKE_TIMEOUT);

    this.enableRatingElement();
  }

  errorCommentSubmitHandler() {
    const commentForm = this.getElement().querySelector(`.film-details__new-comment`);
    const commentInput = this.getElement().querySelector(`.film-details__comment-input`);
    const uncheckedEmotionInputs = this.getElement().querySelectorAll(`input[name="comment-emoji"]:not(:checked)`);

    commentForm.style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    commentInput.readOnly = true;
    commentInput.style.border = `3px solid red`;
    uncheckedEmotionInputs.forEach((input) => (input.disabled = true));

    setTimeout(() => {
      commentForm.style.animation = ``;
      commentInput.readOnly = false;
      commentInput.style.border = ``;
      uncheckedEmotionInputs.forEach((input) => (input.disabled = false));
    }, SHAKE_TIMEOUT);

    commentInput.disabled = false;
  }

  errorCommentDeleteHandler() {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((elem) => {
      if (elem.disables) {
        elem.textContent = `Delete`;
        elem.disables = false;
      }
    });
  }

}
