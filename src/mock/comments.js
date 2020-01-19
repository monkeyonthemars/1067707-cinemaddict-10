import {getRandomIntegerNumber, getRandomArrayItem, generateRandomText} from '../utils/random.js';
import {getSentences} from '../utils/mock.js';

const MIN_COMMENT_SENTENCE = 1;
const MAX_COMMENT_SENTENCE = 4;
const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 20;

const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Bill Maher`,
  `Joe Rogan`
];

const EMOJI = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 90);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateComment = () => {
  return {
    author: getRandomArrayItem(AUTHORS),
    text: generateRandomText(getSentences(), MIN_COMMENT_SENTENCE, MAX_COMMENT_SENTENCE),
    emoji: getRandomArrayItem(EMOJI),
    date: getRandomDate()
  };
};

const generateComments = () => {
  let comments = [];
  const commentsCount = getRandomIntegerNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return comments;
};

export {generateComment, generateComments};
