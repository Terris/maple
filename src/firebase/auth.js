import { auth, googleAuthProvider } from './firebase';

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signInWithGoogle = () =>
  auth.signInWithPopup(googleAuthProvider)

export const signOut = () =>
  auth.signOut()

export const currentUser = () =>
  auth.currentUser

export const sendPasswordResetEmail = (email) =>
  auth.sendPasswordResetEmail(email)
