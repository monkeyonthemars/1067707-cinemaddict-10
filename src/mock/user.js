import {getRandomIntegerNumber} from '../utils/common.js';

const MIN_USER_RATE = 0;
const MAX_USER_RATE = 30;

const generateUserInfo = () => {
  return {
    rating: getRandomIntegerNumber(MIN_USER_RATE, MAX_USER_RATE)
  };
};

export {generateUserInfo};
