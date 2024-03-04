import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC9dyfoqGcvCNTfUMtPMHmZVqF-woF9rtw',
  authDomain: 'esp-test-71219.firebaseapp.com',
  databaseURL: 'https://esp-test-71219-default-rtdb.firebaseio.com',
  projectId: 'esp-test-71219',
  storageBucket: 'esp-test-71219.appspot.com',
  messagingSenderId: '776839629556',
  appId: '1:776839629556:android:9028bc733c9d4a2939aca1',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase(app);
export {db};