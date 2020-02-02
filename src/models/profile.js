export const getUserRate = (watchedFilmsCount) => {

  const USER_RATE = {
    NOVICE_START: 1,
    NOVICE_END: 10,
    FAN_START: 11,
    FAN_END: 20,
    MOVIEBUFF_START: 21
  };

  switch (true) {
    case (watchedFilmsCount >= USER_RATE.NOVICE_START && watchedFilmsCount <= USER_RATE.NOVICE_END):
      return `novice`;
    case (watchedFilmsCount >= USER_RATE.FAN_START && watchedFilmsCount <= USER_RATE.FAN_END):
      return `fan`;
    case (watchedFilmsCount >= USER_RATE.MOVIEBUFF_START):
      return `movie buff`;
    default:
      return ``;
  }

};
