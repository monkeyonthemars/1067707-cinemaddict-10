const getSotredArray = (arr, sortField, count) => {
  return arr.slice().sort(function (first, second) {
    return second[sortField] - first[sortField];
  }).slice(0, count);
};

export {getSotredArray};
