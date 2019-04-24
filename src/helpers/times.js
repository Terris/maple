import * as moment from 'moment';

export const now = () => {
  return moment().format();
}

export const duration = (start, end) => {
  let dur = '';
  if (!start && !end) {
    dur = '0.00';
  } else if (!end) {
    dur = moment.duration(moment().diff(moment(start))).as('hours').toFixed(2);
  } else {
    dur = moment.duration(moment(end).diff(moment(start))).as('hours').toFixed(2);
  }
  return dur;
}
