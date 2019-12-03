export const createFilmCardTemplate = (film) => {

  const MAX_LENGTH_DESCRIPTION = 140;

  const {title, rating, year, duration, genres, poster, description, commentsCount} = film;

  const getShortText = (text, length) => {
    if (text.length > length) {
      return text.substr(0, length - 1) + `...`;
    }

    return text;
  };

  const shortDescription = getShortText(description, MAX_LENGTH_DESCRIPTION);
  const genre = genres[0]; // TODO

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title[`title`]}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
