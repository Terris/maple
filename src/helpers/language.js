import { greetings } from '../constants';

export const randomGreeting = () =>
  greetings[Math.floor(Math.random() * Math.floor(greetings.length))]
