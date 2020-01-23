const getSotredArrayByFieldName = (arr, sortField, count) => {
  return arr.slice().sort(function (first, second) {
    return second[sortField] - first[sortField];
  }).slice(0, count);
};

const getSotredArrayByFieldLength = (arr, sortField, count) => {
  return arr.slice().sort(function (first, second) {
    return second[sortField].length - first[sortField].length;
  }).slice(0, count);
};

export {getSotredArrayByFieldName, getSotredArrayByFieldLength};
