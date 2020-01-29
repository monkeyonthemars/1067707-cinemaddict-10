import moment from 'moment';

const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDuration = (date) => {
  return moment.utc(moment.duration(date, `m`).asMilliseconds()).format(`h:mm`);
};

const formatCommentDate = (date) => {
  return moment(date).fromNow();
};

export {formatYear, formatDate, formatDuration, formatCommentDate};
