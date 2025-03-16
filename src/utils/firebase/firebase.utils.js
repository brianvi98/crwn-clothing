import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

// set up auth with Google pop-up signin
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// DB STUFF BELOW: initialize Firestore as db
export const db = getFirestore();

//
export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userDocRef;
};
