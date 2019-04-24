import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({ username, email, })

export const getUsers = () =>
  db.ref('users').once('value')

// Projects API
// ----------------------------------
export const projects = () =>
  db.ref('/projects')

export const project = (project_id) =>
  db.ref(`/projects/${project_id}`)

// TaskLists API
// ----------------------------------
export const tasklists = () =>
  db.ref('/tasklists')

export const tasklist = ( tasklist_id ) =>
  db.ref(`/tasklists/${tasklist_id}`)

// Tasks API
// ----------------------------------
export const tasklist_tasks = (tasklist_id) =>
  db.ref(`/tasklists/${tasklist_id}/tasks`)

export const tasklist_task = (tasklist_id, task_id) =>
  db.ref(`/tasklists/${tasklist_id}/tasks/${task_id}`)

// Notes API
// ----------------------------------
export const getNotes = () =>
  db.ref('/notes').once('value')

// Timers API
// ----------------------------------

export const timers = () =>
  db.ref('/timers')

export const timer = (timer_id) =>
  db.ref(`/timers/${timer_id}`)
