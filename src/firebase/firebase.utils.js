import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCVXLrBeTNLFay7fB1fXd99-_qD5SiQWYs",
  authDomain: "crown-db-ceb1e.firebaseapp.com",
  databaseURL: "https://crown-db-ceb1e.firebaseio.com",
  projectId: "crown-db-ceb1e",
  storageBucket: "crown-db-ceb1e.appspot.com",
  messagingSenderId: "97243987444",
  appId: "1:97243987444:web:6c667ec2c52e4ce1b5cda1",
  measurementId: "G-J8QKFWTWNR"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
