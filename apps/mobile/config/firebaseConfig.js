
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCB7EhX14ZxWdRoislSvUKamsdnNAgXEvE",
  authDomain: "weatherauthapp-30060.firebaseapp.com",
  projectId: "weatherauthapp-30060",
  storageBucket: "weatherauthapp-30060.firebasestorage.app",
  messagingSenderId: "856280321733",
  appId: "1:856280321733:web:af31947af9fe447affaaac",
  measurementId: "G-2S2ZYCZXMJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);