import {getRandomIntegerNumber, getRandomArrayItem, generateText, getRandomSentences} from '../utils.js';
const MIN_YEAR = 1980;
const MAX_YEAR = 2019;
const MIN_RATING = 1;
const MAX_RATING = 9;
const MIN_DESCRIPTION_SENTENCE = 1;
const MAX_DESCRIPTION_SENTENCE = 3;
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
const MIX_RELEASE_DATE = 1930;
const MAX_RELEASE_DATE = 2019;
const POSTERS_PATH = `./images/posters/`;

const TITLES = [
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

const GENRES = [
  `Comedy`,
  `Crime`,
  `Drama`,
  `Action`,
  `Adventure`,
  `Fantasy`
];

const POSTERS = [`popeye-meets-sinbad.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DIRECTORS = [`Стивен Спилберг`,
  `Джородж Лукас`,
  `Мартин Скорсезе`,
  `Вуди Аллен`,
  `Квентин Тарантино`
];

const WRITERS = [`Билли Уайлдер`,
  `Итан Коэн`,
  `Джоэл Коэн`,
  `Роберт Таун`,
  `Пол Шредер`,
  `Аарон Соркин`
];

const ACTORS = [
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

const FILMRATINGS = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`
];

const COUNTRIES = [
  `USA`,
  `Russia`,
  `Germany`,
  `India`
];

const getRandomFloatNumber = (min, max) => {
  return (min + (max - min) * Math.random()).toFixed(1);
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
    title: getRandomArrayItem(TITLES),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    year: getRandomIntegerNumber(MIN_YEAR, MAX_YEAR),
    duration: generateDuration(MIN_DURATION, MAX_DURATION),
    genres: genarateArray(GENRES, MIN_GENRE_COUNT, MAX_GENRE_COUNT),
    poster: POSTERS_PATH + getRandomArrayItem(POSTERS),
    description: generateText(
        getRandomSentences(), MIN_DESCRIPTION_SENTENCE, MAX_DESCRIPTION_SENTENCE),
    userRate: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    director: genarateArray(DIRECTORS, MIN_DIRECTOR_COUNT, MAX_DIRECTOR_COUNT),
    writer: genarateArray(
        WRITERS, MIN_SCREENWRITER_COUNT, MAX_SCREENWRITER_COUNT),
    actors: genarateArray(ACTORS, MIN_ACTOR_COUNT, MAX_ACTOR_COUNT),
    releaseDate: new Date(
        getRandomIntegerNumber(MIX_RELEASE_DATE, MAX_RELEASE_DATE),
        getRandomIntegerNumber(1, 12),
        getRandomIntegerNumber(1, 31)),
    filmRating: getRandomArrayItem(FILMRATINGS),
    country: getRandomArrayItem(COUNTRIES),
    commentsCount: getRandomIntegerNumber(0, 50)
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCards};
