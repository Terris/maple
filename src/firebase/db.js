import { db } from './firebase';

// User API
// ----------------------------------
export const createUser = (id, email) =>
  db.ref(`users/${id}`).set({ email })

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

export const order_tasklist_tasks = (tasklist_id) => {
  console.log(tasklist_tasks(tasklist_id));
}

// Notes API
// ----------------------------------
export const notes = () =>
  db.ref('/notes')

export const note = (note_id) =>
  db.ref(`/notes/${note_id}`)

// Timers API
// ----------------------------------

export const timers = () =>
  db.ref('/timers')

export const timer = (timer_id) =>
  db.ref(`/timers/${timer_id}`)
