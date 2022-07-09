import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLxlsobq5eUGnhzD6zskdztPiSTzYPmgU",
  authDomain: "vue-api-470fe.firebaseapp.com",
  projectId: "vue-api-470fe",
  storageBucket: "vue-api-470fe.appspot.com",
  messagingSenderId: "705886635644",
  appId: "1:705886635644:web:fe2c7872bd7be4a17aabf9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }