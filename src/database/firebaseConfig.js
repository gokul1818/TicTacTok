import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC9dyfoqGcvCNTfUMtPMHmZVqF-woF9rtw',
  projectId: 'esp-test-71219',
  storageBucket: 'esp-test-71219.appspot.com',
  appId: '1:776839629556:android:9028bc733c9d4a2939aca1',
  messagingSenderId: '776839629556',
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}