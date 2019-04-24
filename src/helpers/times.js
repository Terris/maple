import * as moment from 'moment';

export const now = () =>
  moment().format()

export const nowPlus = ( plus ) =>
  moment().add(plus, 'hours').format()

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
