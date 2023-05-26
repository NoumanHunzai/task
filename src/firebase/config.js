// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCudywCUTJgeuKJ9d1LCdiSNpf_DiPc-to",
  authDomain: "task-5a0c4.firebaseapp.com",
  projectId: "task-5a0c4",
  storageBucket: "task-5a0c4.appspot.com",
  messagingSenderId: "213423386669",
  appId: "1:213423386669:web:d820f00a017833e2aa88a4",
  measurementId: "G-640NLVQ64M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
