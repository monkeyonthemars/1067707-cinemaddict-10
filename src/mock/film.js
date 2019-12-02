const MIN_YEAR = 1980;
const MAX_YEAR = 2019;
const MIN_RATING = 1;
const MAX_RATING = 9;
const MIN_DESCRIPTION_SENTENCE = 1;
const MAX_DESCRIPTION_SENTENCE = 3;
const MIN_COMMENT_SENTENCE = 1;
const MAX_COMMENT_SENTENCE = 4;
const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 20;
const MIN_GENRE_COUNT = 3;
const MAX_GENRE_COUNT = 5;
const MIN_DIRECTOR_COUNT = 1;
const MAX_DIRECTOR_COUNT = 2;
const MIN_SCREENWRITER_COUNT = 1;
const MAX_SCREENWRITER_COUNT = 3;
const MIN_ACTOR_COUNT = 3;
const MAX_ACTOR_COUNT = 10;
const MIN_DURATION = 40;
const MAX_DURATION = 180;
const POSTERS_PATH = `./images/posters/`;


const Titles = [
  {title: `Баллада Бастера Скраггса`,
    originalTitle: `The Ballad of Buster Scruggs`},
  {title: `Да здравствует Цезарь!`,
    originalTitle: `Hail, Caesar!`},
  {title: `Внутри Льюина Дэвиса`,
    originalTitle: `Inside Llewyn Davis`},
  {title: `Железная хватка`,
    originalTitle: `True Grit`},
  {title: `Серьёзный человек`,
    originalTitle: `A Serious Man`},
  {title: `После прочтения сжечь`,
    originalTitle: `Burn After Reading`},
  {title: `Старикам тут не место`,
    originalTitle: `No Country for Old Men`},
  {title: `Париж, я люблю тебя`,
    originalTitle: `Paris, je t'aime`},
  {title: `Игры джентльменов`,
    originalTitle: `The Ladykillers`},
  {title: `Невыносимая жестокость`,
    originalTitle: `Intolerable Cruelty`},
  {title: `Человек, которого не было`,
    originalTitle: `The Man Who Wasn't There`},
  {title: `О, где же ты, брат?`,
    originalTitle: `O Brother, Where Art Thou?`},
  {title: `Большой Лебовски`,
    originalTitle: `The Big Lebowski`},
  {title: `Фарго`,
    originalTitle: `Fargo`},
  {title: `Подручный Хадсакера`,
    originalTitle: `The Hudsucker Proxy`}
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

const Directors = [`Стивен Спилберг`,
  `Джородж Лукас`,
  `Мартин Скорсезе`,
  `Вуди Аллен`,
  `Квентин Тарантино`
];

const Writers = [`Билли Уайлдер`,
  `Итан Коэн`,
  `Джоэл Коэн`,
  `Роберт Таун`,
  `Пол Шредер`,
  `Аарон Соркин`
];

const Actors = [
  `Джонни Депп`,
  `Брэд Питт`,
  `Леонардо ДиКаприо`,
  `Мэттью Макконахи`,
  `Брэдли Купер`,
  `Джордж Клуни`,
  `Шон Пенн`,
  `Брюс Уиллис`,
  `Роберт Редфорд`,
  `Аль Пачино`,
  `Харрисон Форд`,
  `Ричард Гир`,
  `Роберт Дауни-мл.`,
  `Джерард Батлер`,
  `Ченнинг Татум`,
  `Арми Хаммер`,
  `Том Круз`,
  `Кевин Костнер`,
  `Джеймс Франко`,
  `Оуэн Уилсон`
];

const FilmRatings = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`
];

const Сountries = [
  `USA`,
  `Russia`,
  `Germany`,
  `India`
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
  .join(`. `) + `.`;
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

const genarateArray = (arr, min, max) => {
  return arr
  .filter(() => Math.random() > 0.5)
  .slice(0, getRandomIntegerNumber(min, max));
};

const generateFilmCard = () => {
  return {
    title: getRandomArrayItem(Titles),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    year: getRandomIntegerNumber(MIN_YEAR, MAX_YEAR),
    duration: generateDuration(MIN_DURATION, MAX_DURATION),
    genres: genarateArray(Genres, MIN_GENRE_COUNT, MAX_GENRE_COUNT),
    poster: POSTERS_PATH + getRandomArrayItem(Posters),
    description: generateText(
        RandomSentences, MIN_DESCRIPTION_SENTENCE, MAX_DESCRIPTION_SENTENCE),
    comments: generateComments(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
    userRate: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    director: genarateArray(Directors, MIN_DIRECTOR_COUNT, MAX_DIRECTOR_COUNT),
    writer: genarateArray(
        Writers, MIN_SCREENWRITER_COUNT, MAX_SCREENWRITER_COUNT),
    actors: genarateArray(Actors, MIN_ACTOR_COUNT, MAX_ACTOR_COUNT),
    releaseDate: new Date(
        getRandomIntegerNumber(1930, 2019),
        getRandomIntegerNumber(1, 12),
        getRandomIntegerNumber(1, 31)),
    filmRating: getRandomArrayItem(FilmRatings),
    country: getRandomArrayItem(Сountries)
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
