const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const generateRandomText = (sentences, min, max) => {
  return sentences
  .filter(() => Math.random() > 0.5)
  .slice(0, getRandomIntegerNumber(min, max))
  .join(`. `) + `.`;
};

export {getRandomIntegerNumber, getRandomArrayItem, generateRandomText};
