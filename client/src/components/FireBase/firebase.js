import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyArWBo1luvgxloKUJmx5sXtaVBopYbNxMI",
  authDomain: "flip-dev-5d718.firebaseapp.com",
  projectId: "flip-dev-5d718",
  storageBucket: "flip-dev-5d718.appspot.com",
  messagingSenderId: "674781734691",
  appId: "1:674781734691:web:38785d653c7ed91f234e96",
});

export const auth = app.auth();
export default app;
