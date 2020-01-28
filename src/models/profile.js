export const getUserRate = (watchedFilmsCount) => {

  switch (true) {
    case (watchedFilmsCount > 0 && watchedFilmsCount < 11):
      return `novice`;
    case (watchedFilmsCount > 10 && watchedFilmsCount < 21):
      return `fan`;
    case (watchedFilmsCount > 20):
      return `movie buff`;
    default:
      return ``;
  }

};
