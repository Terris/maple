import * as moment from 'moment';

export const niceDate = (date) =>
  moment(date).format("dddd, MMMM Do YYYY")

export const now = () =>
  moment().format()

export const nowPlus = ( plus ) =>
  moment().add(plus, 'hours').format()

export const duration = (start, end) => {
  return moment.duration(moment(end).diff(moment(start))).as('hours');
}

export const durationPlus = (start, end, prev) =>
  parseFloat(duration(start, end)) + parseFloat(prev)

export const updateTimerWhile = (timer, running) => {

}
