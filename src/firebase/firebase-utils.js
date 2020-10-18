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

  //New or existing user reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //Getting user snapshot.
  const snapShot = await userRef.get();

  //Creating a new user object on database
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //Setting user
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

//Adding shop items to firestore
//Used for one time
export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocumentRef = collectionRef.doc();
    batch.set(newDocumentRef, obj);
  });

  //returns a promise
  return await batch.commit();
};

export const collectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      //getting title property as a usable route name with encodeURI
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  //Setting collection item titles as collection keys:
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
