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
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};

const toISODate = (date) => {
  return moment(date).toISOString();
};

export {formatYear, formatDate, formatDuration, formatCommentDate, toISODate};
