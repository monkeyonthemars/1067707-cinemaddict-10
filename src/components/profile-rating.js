export const createProfileRatingTemplate = (user) => {

  const {rating} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="" alt="Avatar" width="35" height="35">
  </section>`;
};
