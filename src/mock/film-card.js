const MIN_YEAR = 1980;
const MAX_YEAR = 2019;
const MIN_RATING = 0;
const MAX_RATING = 10;
const MIN_DESCRIPTION_SENTENCE = 1;
const MAX_DESCRIPTION_SENTENCE = 3;
const MIN_COMMENT_SENTENCE = 1;
const MAX_COMMENT_SENTENCE = 4;
const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 20;
const MIN_DURATION = 40;
const MAX_DURATION = 180;
const POSTERS_PATH = `./images/posters/`;


const Titles = [
  `The Ballad of Buster Scruggs`,
  `Hail, Caesar!`,
  `Inside Llewyn Davis`,
  `True Grit`,
  `A Serious Man`,
  `Burn After Reading`,
  `No Country for Old Men`,
  `Paris, je t'aime`,
  `The Ladykillers`,
  `Intolerable Cruelty`,
  `The Man Who Wasn't There`,
  `O Brother, Where Art Thou?`,
  `The Big Lebowski`,
  `Fargo`,
  `The Hudsucker Proxy`
];

const Genres = [
  `Comedy`,
  `Crime`,
  `Drama`,
  `Action`,
  `Adventure`,
  `Fantasy`
];

const Posters = [`popeye-meets-sinbad.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const RandomSentences = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
    .split(`. `);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomFloatNumber = (min, max) => {
  return (min + (max - min) * Math.random()).toFixed(1);
};

const generateText = (sentences, min, max) => {
  return sentences
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(min, max))
    .join(`. `);
};

const generateComments = (min, max) => {
  let comments = [];
  const commentsCount = getRandomIntegerNumber(min, max);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateText(
        RandomSentences, MIN_COMMENT_SENTENCE, MAX_COMMENT_SENTENCE));
  }

  return comments;
};

const generateDuration = (min, max) => {
  const duration = getRandomIntegerNumber(min, max);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (hours ? hours + `h` : ``) +
      (hours && minutes ? ` ` : ``) +
      (minutes ? minutes + `m` : ``);
};

const generateFilmCard = () => {
  return {
    title: getRandomArrayItem(Titles),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    year: getRandomIntegerNumber(MIN_YEAR, MAX_YEAR),
    duration: generateDuration(MIN_DURATION, MAX_DURATION),
    genre: getRandomArrayItem(Genres),
    poster: POSTERS_PATH + getRandomArrayItem(Posters),
    description: generateText(
        RandomSentences, MIN_DESCRIPTION_SENTENCE, MAX_DESCRIPTION_SENTENCE),
    comments: generateComments(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT)
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
