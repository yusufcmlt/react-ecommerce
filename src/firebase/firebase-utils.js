import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDpJsgDA2DTkQy8-1ookVqp7Bqc1Oba8Dk",
  authDomain: "react-commerce-db-ad6da.firebaseapp.com",
  databaseURL: "https://react-commerce-db-ad6da.firebaseio.com",
  projectId: "react-commerce-db-ad6da",
  storageBucket: "react-commerce-db-ad6da.appspot.com",
  messagingSenderId: "1015993007368",
  appId: "1:1015993007368:web:6f3628afdf1585727040bd",
  measurementId: "G-HNL82FFDNM",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
