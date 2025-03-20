import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhXdTI41tPEq5VZc780_lNqovD7AIynmE",
  authDomain: "crwn-clothing-db-57df5.firebaseapp.com",
  projectId: "crwn-clothing-db-57df5",
  storageBucket: "crwn-clothing-db-57df5.firebasestorage.app",
  messagingSenderId: "509206842279",
  appId: "1:509206842279:web:eb0425e0ae2f534103c482",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// ~~~ AUTH ~~~
// set up auth with Google pop-up signin. if you want a different service
// like Github, make more providers and handlers
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// this sign-in is native, so we don't need anything more than this
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// ~~~ FIRESTORE DB ~~~
// initialize Firestore as db
export const db = getFirestore();

// takes a user object from an auth, checks if it exists and creates if not
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userDocRef;
};
