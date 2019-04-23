import { auth, googleAuthProvider } from './firebase';

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailandPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signInWithGoogle = () =>
  auth.signInWithPopup(googleAuthProvider)

export const signOut = () =>
  auth.signOut()

export const currentUser = () =>
  auth.currentUser
