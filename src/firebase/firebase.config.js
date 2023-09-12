import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDgT1tt-A3gps7aOpC22GEn5VO56MJzGFE',
  authDomain: 'foodapp-26755.firebaseapp.com',
  databaseURL: 'https://foodapp-26755-default-rtdb.firebaseio.com',
  projectId: 'foodapp-26755',
  storageBucket: 'foodapp-26755.appspot.com',
  messagingSenderId: '571616512860',
  appId: '1:571616512860:web:363c76a7b0947ff3d6cf99',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { app, firestore, storage, auth, provider };

onAuthStateChanged(auth, (user) => {
  // console.log(user);
});
